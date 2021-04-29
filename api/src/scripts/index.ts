import { cleanLocationNames, mergeLocationData } from "../utils";

import { LocationData } from "./types";
import { getAndhraPageData } from "./andhra";
import { getBangalorePageData } from "./bangalore";
import { getDelhiPageData } from "./delhi";
import { getNagpurPageData } from "./nagpur";
import { getNashikPageData } from "./nashik";
import { getPunePageData } from "./pune";
import { getTelanganaData } from "./telangana";
import puppeteer from "puppeteer";
import { saveData } from "./saveData";

async function scrape(): Promise<LocationData[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const locationObjects: LocationData[][] = await Promise.all([
    getPunePageData(browser),
    getBangalorePageData(browser),
    getDelhiPageData(browser),
    // getVadodaraPageData(browser),
    getNagpurPageData(browser),
    getNashikPageData(browser),
    // getGurgaonPageData(browser), website has changed
    getTelanganaData(browser),
    getAndhraPageData(browser),
  ]);

  await browser.close();
  return cleanLocationNames(mergeLocationData(locationObjects));
}

async function main() {
  console.log("-------Scraping Started---------");
  let startTime = Date.now();

  const locations = await scrape();

  let endTime = Date.now();
  console.log(`Scraping took ${(endTime - startTime) / 1000}s`);
  console.log("--------Scraping Ended-----------");

  console.log("--------Saving Started-----------");
  startTime = Date.now();

  const updateTimestamp = Math.floor(Date.now() / 1000);
  await saveData(locations, updateTimestamp);

  endTime = Date.now();
  console.log(
    `Processing and saving data took ${(endTime - startTime) / 1000}s`
  );
  console.log("--------Saving Ended-----------");
}

main();
// setInterval(() => main(), 1800 * 1000);
