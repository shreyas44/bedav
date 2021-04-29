import { HospitalData, LocationData } from "./types";
import cheerio, { Cheerio } from "cheerio";
import puppeteer, { Browser } from "puppeteer";

const URL = "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/";

function getTableData($: cheerio.Root): HospitalData[] {
  const hospitals: HospitalData[] = [];

  const rows = $("table").children("tbody").children("tr");

  for (const row of rows) {
    const columns: string[] = [];
    $(row)
      .children("td")
      .each((index, elm) => columns.push($(elm).text().trim()));

    const hospital: HospitalData = {
      name: columns[1],
      icu: {
        total: parseInt(columns[4]),
        occupied: parseInt(columns[5]),
        available: parseInt(columns[6]),
      },
      oxygen: {
        total: parseInt(columns[7]),
        occupied: parseInt(columns[8]),
        available: parseInt(columns[9]),
      },
      general: {
        total: parseInt(columns[10]),
        occupied: parseInt(columns[11]),
        available: parseInt(columns[12]),
      },
      ventilator: {
        available: parseInt(columns[13]),
      },
    };

    hospitals.push(hospital);
  }

  return hospitals;
}

async function getPageData(
  browser: Browser,
  districtNumber: number
): Promise<HospitalData[]> {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle0" });

  await Promise.all([
    page.click(`table tbody tr:nth-child(${districtNumber}) td:nth-child(2) a`),
    page.waitForResponse(URL + "process.php", { timeout: 0 }),
  ]);

  const $ = cheerio.load(await page.content());
  const hospitals = getTableData($);
  return hospitals;
}

export async function getAndhraPageData(
  browser: Browser
): Promise<LocationData[]> {
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
    await page.waitForSelector("table tbody tr");
    let $ = cheerio.load(await page.content());
    const districtsCount = $("table").children("tbody").children("tr").length;
    const districts: string[] = [];
    $("table tbody tr td:nth-child(2) a").each((index, elm) =>
      districts.push($(elm).text().toLowerCase())
    );
    const locations: LocationData[] = [];

    const districtPromises: Promise<HospitalData[]>[] = [];
    for (let i = 0; i < districtsCount; i++) {
      districtPromises.push(getPageData(browser, i + 1));
    }

    const districtHospitals = await Promise.all(districtPromises);

    for (let i = 0; i < districtPromises.length; i++) {
      locations.push({
        name: districts[i],
        state: "AP",
        hospitals: districtHospitals[i],
        options: {
          getPhone: true,
          onlyHasAvailable: false,
          useAddressForSearch: false,
        },
      });
    }

    await page.close();
    return locations;
  } catch (err) {
    console.log("Andhra page failed" + err);

    await page.close();
    return [];
  }
}
