import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";

// thane

// main url - https://covidthane.org/availabiltyOfHospitalBeds.html
const URL = "https://covidbedthane.in/HospitalInfo/showindex";

export async function getThanePageData(
  browser: Browser
): Promise<LocationData> {
  const hospitals: HospitalData[] = [];

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle0" });

  const $ = cheerio.load(await page.content());
  const rows = $(".content-area")
    .children(".container")
    .children(".row:nth-child(4)")
    .children("div");

  console.log(rows.length);

  for (const row of rows) {
    const container = $(row).children("div").children("div").children("div");
    const name = container
      .children("div")
      .first()
      .children("div")
      .children("h4")
      .first()
      .text()
      .trim();

    const hospital = {
      name,
    };

    hospitals.push(hospital);
  }

  await page.close();
  return { thane: hospitals };
}
