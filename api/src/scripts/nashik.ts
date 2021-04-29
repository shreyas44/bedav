import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";

// main url - http://covidcbrs.nmc.gov.in/home/hospitalSummary

const URL = "http://covidcbrs.nmc.gov.in/home/searchHosptial";

export async function getNashikPageData(
  browser: Browser
): Promise<LocationData<"nashik">[]> {
  const page = await browser.newPage();
  const hospitals: HospitalData[] = [];

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
    const $ = cheerio.load(await page.content());

    const rows = $("table").children("tbody").children("tr");

    for (const row of rows) {
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => columns.push($(elm).text().trim()));

      const categoryText = columns[2].toLowerCase();
      const category = categoryText.includes("dchc")
        ? "dchc"
        : categoryText.includes("dch")
        ? "dch"
        : categoryText.includes("ccc")
        ? "ccc"
        : undefined;

      const hospital: HospitalData = {
        name: columns[1],
        category,
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
        options: {
          getPhone: true,
          onlyHasAvailable: false,
          useAddressForSearch: false,
        },
      },
    ];
  } catch (err) {
    console.log("Nashik page failed\n" + err);

    await page.close();
    return [];
  }
}
