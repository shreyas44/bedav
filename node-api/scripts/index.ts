import { cleanLocationNames, mergeLocationData } from "./utils";
import { getObjects, saveUpdates } from "./saveData";

import { LocationData } from "./types";
import { getAndhraPageData } from "./andhra";
import { getBangalorePageData } from "./bangalore";
import { getDelhiPageData } from "./delhi";
import { getGurgaonPageData } from "./gurgaon";
import { getNagpurPageData } from "./nagpur";
import { getNashikPageData } from "./nashik";
import { getPunePageData } from "./pune";
import { getTelanganaData } from "./telangana";
import { getThanePageData } from "./thane";
import { getVadodaraPageData } from "./vadodara";
import { join } from "path";
import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

interface Times {
  [city: string]: { start: number; end: number };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  console.log("-------Scraping Started---------");
  let startTime = Date.now();

  const locationObjects: LocationData[][] = await Promise.all([
    getPunePageData(browser),
    getBangalorePageData(browser),
    getDelhiPageData(browser),
    getVadodaraPageData(browser),
    getNagpurPageData(browser),
    getNashikPageData(browser),
    getGurgaonPageData(browser),
    getTelanganaData(browser),
    getAndhraPageData(browser),
  ]);

  let endTime = Date.now();
  await browser.close();
  console.log(`Scraping took ${(endTime - startTime) / 1000}s`);
  console.log("--------Scraping Ended-----------");

  startTime = Date.now();
  let data = mergeLocationData(locationObjects);
  data = cleanLocationNames(data);
  data = await getObjects(data);
  await saveUpdates(data);
  endTime = Date.now();

  console.log(
    `Processing and saving data took ${(endTime - startTime) / 1000}s`
  );

  writeFileSync(join(__dirname, "data.json"), JSON.stringify(data, null, 4), {
    flag: "w",
  });
}

main();
// setInterval(() => main(), 1800 * 1000);
