import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";

// main url - https://covidggn.com/
const URL = "https://covidggn.com/Public/Pages/Gurugram-Hospitals";

function getAvailability(string: string): number {
  return string.toLowerCase() === "no" ? 0 : parseInt(string);
}

export async function getGurgaonPageData(
  browser: Browser
): Promise<LocationData<"gurgaon">[]> {
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0" });
    await page.waitForSelector("table > tbody > tr");
    const $ = cheerio.load(await page.content());

    const hospitals: HospitalData[] = [];
    const rows = $("table").children("tbody").children("tr");

    for (const row of rows) {
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => columns.push($(elm).text().trim()));

      const hospital: HospitalData = {
        name: columns[0],
        oxygen: {
          available: getAvailability(columns[2]),
        },
        icu: {
          available: getAvailability(columns[3]),
        },
        ventilator: {
          available: getAvailability(columns[4]),
        },
      };

      hospitals.push(hospital);
    }

    await page.close();
    return [
      {
        name: "gurgaon",
        state: "HR",
        hospitals,
      },
    ];
  } catch (err) {
    console.log("Gurgaon page failed\n" + err);
    return [];
  }
}
