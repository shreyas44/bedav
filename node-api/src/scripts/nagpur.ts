import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";

// nagpur

const URL = "http://nsscdcl.org/covidbeds/AvailableHospitals.jsp";

export async function getNagpurPageData(
  browser: Browser
): Promise<LocationData<"nagpur">[]> {
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0" });
    const $ = cheerio.load(await page.content());

    const hospitals: HospitalData[] = [];
    const rows = $("table").children("tbody").children("tr").slice(1);

    for (const row of rows) {
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => columns.push($(elm).text().trim()));

      const hospital: HospitalData = {
        name: columns[1],
        oxygen: {
          available: parseInt(columns[2]),
        },
        general: {
          available: parseInt(columns[3]),
        },
        icu: {
          available: parseInt(columns[4]),
        },
        ventilator: {
          available: parseInt(columns[5]),
        },
      };

      hospitals.push(hospital);
    }

    return [
      {
        name: "nagpur",
        state: "MH",
        hospitals,
      },
    ];
  } catch (err) {
    console.log("Nagpur page failed\n" + err);
    return [];
  }
}
