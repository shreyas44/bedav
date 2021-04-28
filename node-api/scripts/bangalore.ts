import { HospitalData, LocationData } from "./types";
import cheerio, { Cheerio } from "cheerio";

import puppeteer from "puppeteer";

// bangalore

const URL = "https://bbmpgov.com/";

function replaceId(html: string, replacementId: string): string {
  let counter = 0;
  html = html.replace(/GovernmentMedical/g, (match) => {
    counter += 1;
    if (counter === 2) return replacementId;
    return match;
  });

  return html;
}

export async function getBangalorePageData(
  browser: puppeteer.Browser
): Promise<LocationData<"bangalore">[]> {
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle0" });
  let html = await page.content();
  html = replaceId(html, "PrivateHospitals");
  html = replaceId(html, "PrivateMedicalHospitals");
  html = replaceId(html, "CCCTable");

  const $ = cheerio.load(html);
  const ids = {
    GovernmentHospitalsDetail: "gov_hos",
    GovernmentMedical: "gov_med",
    PrivateHospitals: "pri_hos",
    PrivateMedicalHospitals: "pri_med",
    CCCTable: "covid",
  };

  const hospitals: HospitalData[] = [];
  let id: keyof typeof ids;
  for (id in ids) {
    let rows = $(`#${id}`).children("tbody").children("tr");
    rows = rows.slice(0, rows.length - 1);

    for (const row of rows) {
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => columns.push($(elm).text().trim()));

      if (id === "CCCTable") {
        const hospital: HospitalData = {
          name: columns[1],
          general: {
            total: parseInt(columns[2]),
            occupied: parseInt(columns[3]),
            available: parseInt(columns[4]),
          },
        };
        hospitals.push(hospital);

        continue;
      }

      const hospital: HospitalData = {
        name: columns[1],
        general: {
          total: parseInt(columns[2]),
          occupied: parseInt(columns[7]),
          available: parseInt(columns[12]),
        },
        hdu: {
          total: parseInt(columns[3]),
          occupied: parseInt(columns[8]),
          available: parseInt(columns[13]),
        },
        icu: {
          total: parseInt(columns[4]),
          occupied: parseInt(columns[9]),
          available: parseInt(columns[14]),
        },
        ventilator: {
          total: parseInt(columns[5]),
          occupied: parseInt(columns[10]),
          available: parseInt(columns[15]),
        },
      };

      hospitals.push(hospital);
    }
  }

  await page.close();

  return [
    {
      name: "bangalore",
      state: "KA",
      hospitals,
    },
  ];
}
