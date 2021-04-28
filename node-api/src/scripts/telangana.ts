import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";
import { mergeLocationHospitals } from "./utils";

const URL =
  "http://164.100.112.24/SpringMVC/Hospital_Beds_Statistic_Bulletin_citizen.html";

function getName(string: string, number: number) {
  return string.split(`${number}.`)[1].trim();
}

function getTableData($: cheerio.Root): LocationData[] {
  const rows = $("table").children("tbody").children("tr");
  const hospitals: LocationData[] = [];

  let counter = 1;
  let currentKey = 0;

  for (const row of rows) {
    const columnsLength = $(row).children("td").length;
    let columns: string[] = [];

    $(row)
      .children("td")
      .each((index, elm) => columns.push($(elm).text().trim()));

    let dataIndexes = {
      name: 0,
      general: {
        available: 4,
        occupied: 3,
        total: 2,
      },
      oxygen: {
        available: 7,
        occupied: 6,
        total: 5,
      },
      icu: {
        available: 10,
        occupied: 9,
        total: 8,
      },
    };

    if (columnsLength === 18) {
      const currentDistrict = columns[1].toLowerCase();
      hospitals.push({
        name: currentDistrict,
        state: "TS",
        hospitals: [],
      });

      dataIndexes = {
        name: 2,
        general: {
          available: 6,
          occupied: 5,
          total: 4,
        },
        oxygen: {
          available: 9,
          occupied: 8,
          total: 7,
        },
        icu: {
          available: 12,
          occupied: 11,
          total: 10,
        },
      };
    }

    const hospital: HospitalData = {
      name: getName(columns[dataIndexes.name], counter),
      general: {
        available: parseInt(columns[dataIndexes.general.available]),
        occupied: parseInt(columns[dataIndexes.general.occupied]),
        total: parseInt(columns[dataIndexes.general.total]),
      },
      oxygen: {
        available: parseInt(columns[dataIndexes.oxygen.available]),
        occupied: parseInt(columns[dataIndexes.oxygen.occupied]),
        total: parseInt(columns[dataIndexes.oxygen.total]),
      },
      icu: {
        available: parseInt(columns[dataIndexes.icu.available]),
        occupied: parseInt(columns[dataIndexes.icu.occupied]),
        total: parseInt(columns[dataIndexes.icu.total]),
      },
    };

    hospitals[currentKey].hospitals.push(hospital);

    counter += 1;
  }

  return hospitals;
}

export async function getTelanganaData(
  browser: Browser
): Promise<LocationData[]> {
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0" });

    await Promise.all([
      page.click("table tbody tr:nth-child(1) a"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    let $ = cheerio.load(await page.content());
    const govermentHospitals = getTableData($);

    await page.goto(URL, { waitUntil: "networkidle0" });
    await Promise.all([
      page.click("table tbody tr:nth-child(2) a"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    $ = cheerio.load(await page.content());
    const privateHospitals = getTableData($);

    return mergeLocationHospitals([...govermentHospitals, ...privateHospitals]);
  } catch (err) {
    console.log("Telangana page failed\n" + err);
    return [];
  }
}
