import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";

// main url - http://covidcbrs.nmc.gov.in/home/hospitalSummary

const URL = "http://covidcbrs.nmc.gov.in/home/searchHosptial";

export async function getNashikPageData(
  browser: Browser
): Promise<LocationData<"nashik">[]> {
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0" });
    const $ = cheerio.load(await page.content());

    const rows = $("table").children("tbody").children("tr");
    const hospitals: HospitalData[] = [];

    for (const row of rows) {
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => columns.push($(elm).text().trim()));

      const hospital: HospitalData = {
        name: columns[1],
        general: {
          available: parseInt(columns[4]),
          total: parseInt(columns[3]),
          occupied: parseInt(columns[3]) - parseInt(columns[4]),
        },
        oxygen: {
          available: parseInt(columns[6]),
          total: parseInt(columns[5]),
          occupied: parseInt(columns[5]) - parseInt(columns[5]),
        },
        icu: {
          available: parseInt(columns[8]),
          total: parseInt(columns[7]),
          occupied: parseInt(columns[7]) - parseInt(columns[8]),
        },
        ventilator: {
          available: parseInt(columns[10]),
          total: parseInt(columns[9]),
          occupied: parseInt(columns[9]) - parseInt(columns[10]),
        },
      };

      hospitals.push(hospital);
    }

    await page.close();
    return [
      {
        name: "nashik",
        state: "MH",
        hospitals,
      },
    ];
  } catch (err) {
    console.log("Nashik page failed\n" + err);
    return [];
  }
}
