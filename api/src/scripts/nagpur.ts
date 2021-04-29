import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import cheerio from "cheerio";

// nagpur

const URL = "http://nsscdcl.org/covidbeds/AvailableHospitals.jsp";

export async function getNagpurPageData(
  browser: Browser
): Promise<LocationData<"nagpur">[]> {
  const page = await browser.newPage();
  const hospitals: HospitalData[] = [];

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
    const $ = cheerio.load(await page.content());

    const rows = $("table").children("tbody").children("tr").slice(1);

    for (const row of rows) {
      const columns: string[] = [];
      $(row)
        .children("td")
        .each((index, elm) => columns.push($(elm).text().trim()));

      const hospital: HospitalData = {
        name: columns[1],
        oxygen: {
          available: parseInt(columns[2]),
        },
        general: {
          available: parseInt(columns[3]),
        },
        icu: {
          available: parseInt(columns[4]),
        },
        ventilator: {
          available: parseInt(columns[5]),
        },
      };

      hospitals.push(hospital);
    }

    await page.close();
    return [
      {
        name: "nagpur",
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
    console.log("Nagpur page failed\n" + err);

    await page.close();
    return [];
  }
}
