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

      let getNumber = (value: string) => {
        const temp = parseInt(value.replace(/o/g, "0"));
        if ((temp !== 0 && !temp) || isNaN(temp)) return;
        return temp;
      };

      const hospital: HospitalData = {
        name: columns[1].replace("(Click here for contact details)", ""),
        category,
        general: {
          available: getNumber(columns[4]) as number,
          total: getNumber(columns[3]),
        },
        oxygen: {
          available: getNumber(columns[6]) as number,
          total: getNumber(columns[5]),
        },
        icu: {
          available: getNumber(columns[8]) as number,
          total: getNumber(columns[7]),
        },
        ventilator: {
          available: getNumber(columns[10]) as number,
          total: getNumber(columns[9]),
        },
      };

      if (hospital.general?.total!)
        hospital.general.occupied =
          hospital.general.total - hospital.general.available;
      if (hospital.icu?.total)
        hospital.icu.occupied = hospital.icu.total - hospital.icu.available;
      if (hospital.hdu?.total)
        hospital.hdu.occupied = hospital.hdu.total - hospital.hdu.available;
      if (hospital.oxygen?.total)
        hospital.oxygen.occupied =
          hospital.oxygen.total - hospital.oxygen.available;
      if (hospital.ventilator?.total)
        hospital.ventilator.occupied =
          hospital.ventilator.total - hospital.ventilator.available;

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
