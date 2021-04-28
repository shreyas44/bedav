import { HospitalData, LocationData } from "./types";

import cheerio from "cheerio";
import { mergeHospitals } from "./utils";
import puppeteer from "puppeteer";

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
  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content();
  const $ = cheerio.load(html);

  const hospitals: HospitalData[] = [];

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

    const address = $(
      `table tbody tr:nth-child(${
        counter * 2
      }) td .card .card-body:first-child .card-text`
    ).text();

    const hospital: HospitalData = {
      name,
      address,
      [type]: {
        total: parseInt(columns[1]),
        available: parseInt(columns[2]),
        occupied: parseInt(columns[1]) - parseInt(columns[2]),
      },
    };
    hospitals.push(hospital);
  }

  await page.close();
  return hospitals;
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
      },
    ];
  } catch (err) {
    console.log("Delhi page failed\n" + err);
    return [];
  }
}
