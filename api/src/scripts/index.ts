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

  const locationObjects: LocationData[][] = [
    await getPunePageData(browser),
    await getBangalorePageData(browser),
    await getDelhiPageData(browser),
    // getVadodaraPageData(browser),
    await getNagpurPageData(browser),
    await getNashikPageData(browser),
    // getGurgaonPageData(browser), website has changed
    await getTelanganaData(browser),
    await getAndhraPageData(browser),
  ];

  await browser.close();
  return cleanLocationNames(mergeLocationData(locationObjects));
}

export async function main() {
  console.log("-------Scraping Started---------");
  let startTime = Date.now();

  const locations = await scrape();
  locations.map(({ hospitals: { length: hospitals }, name, state }) =>
    console.log({ name, state, hospitals })
  );

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
