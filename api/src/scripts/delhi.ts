import { HospitalData, LocationData } from "./types";
import puppeteer, { Page } from "puppeteer";

import { HospitalType } from ".prisma/client";
import cheerio from "cheerio";
import { mergeHospitals } from "../utils";

// delhi

const GENERAL_URL = "https://coronabeds.jantasamvad.org/beds.html";
const ICU_URL = "https://coronabeds.jantasamvad.org/all-covid-icu-beds.html";

function getName($: cheerio.Root, collapseLink: cheerio.Cheerio) {
  const text = $(collapseLink).text().trim();
  const type = $(collapseLink).children("span").text().trim();
  try {
    const name = text.split(type)[1].trim();
    return name;
  } catch {
    // do nothing
  }

  return "";
}

async function getPageData(
  browser: puppeteer.Browser,
  url: string,
  type: "general" | "icu"
): Promise<HospitalData[]> {
  const page = await browser.newPage();
  const hospitals: HospitalData[] = [];

  try {
    await page.goto(url, { waitUntil: "networkidle0" });

    const html = await page.content();
    const $ = cheerio.load(html);

    let counter = 0;
    const rows = $("table").children("tbody").children("tr:nth-child(odd)");
    for (const row of rows) {
      counter += 1;
      const collapseLink = $(row).children("th").first().children("a").last();
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => {
          columns.push($(elm).children("a").first().text().trim());
        });

      const name = getName($, collapseLink);
      if (!name) continue;

      const categoryText = $(
        `table tbody tr:nth-child(${counter * 2}) td .card ul li:first-child`
      )
        .text()
        .split("Management:")[1]
        .toLowerCase();

      const category: HospitalType | undefined = categoryText.includes("govt")
        ? "gov"
        : categoryText.includes("pvt")
        ? "pri"
        : undefined;

      const hospital: HospitalData = {
        name,
        category,
        [type]: {
          total: parseInt(columns[1]),
          available: parseInt(columns[2]),
          occupied: parseInt(columns[1]) - parseInt(columns[2]),
        },
      };
      hospitals.push(hospital);
    }
  } catch (err) {
    console.log(`Delhi Page failed\n${err}`);
  } finally {
    await page.close();
    return hospitals;
  }
}

export async function getDelhiPageData(
  browser: puppeteer.Browser
): Promise<LocationData<"delhi">[]> {
  try {
    const hospitalArrays = await Promise.all([
      getPageData(browser, GENERAL_URL, "general"),
      getPageData(browser, ICU_URL, "icu"),
    ]);
    const hospitals = mergeHospitals([
      ...hospitalArrays[0],
      ...hospitalArrays[1],
    ]);

    return [
      {
        name: "delhi",
        state: "DL",
        hospitals,
        options: {
          getPhone: true,
          onlyHasAvailable: false,
          useAddressForSearch: false,
        },
      },
    ];
  } catch (err) {
    console.log("Delhi page failed\n" + err);
    return [];
  }
}
