import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";
import { HospitalType } from ".prisma/client";
import cheerio from "cheerio";

// main url - https://covidggn.com/
const URL = "https://coronaharyana.in/";

function getAvailability(string: string): number {
  return string.toLowerCase() === "no" ? 0 : parseInt(string);
}

function getTabData(
  $: cheerio.Root,
  divs: cheerio.Cheerio,
  category?: HospitalType
): HospitalData[] {
  const hospitals: HospitalData[] = [];
  for (const div of divs) {
    const content = $(div).find(".entry-content");
    const name = content
      .children("div:first-child")
      .text()
      .split("Facility Name:")[1]
      .trim()
      .replace(/\n/g, " ");
    const availabilityText = $(content.children("p")[0])
      .text()
      .trim()
      .replace(/\n/g, " ")
      .split("),")[1]
      .trim();
    const totalText = $(content.children("div")[1])
      .text()
      .trim()
      .replace(/\n/g, " ")
      .split("Allocated Beds:")[1]
      .trim();

    const regex = /Isolation Beds: ((?<general>\d+)|(?<generalOver>Beds Over Utilized \d+)), (ICU|ICU Beds): ((?<icu>\d+)|(?<icuOver>Beds Over Utilized \d+)), Ventilators: ((?<ventilator>\d+)|(?<ventilatorOver>Beds Over Utilized \d+))/;
    try {
      const available = regex.exec(availabilityText)!.groups!;
      const total = regex.exec(totalText)!.groups!;

      const hospital: HospitalData = {
        name,
        category,
        ventilator: {
          total: parseInt(total.ventilator),
          available: available.ventilatorOver
            ? 0
            : parseInt(available.ventilator),
          occupied: available.ventilatorOver
            ? parseInt(total.ventilator)
            : parseInt(total.ventilator) - parseInt(available.ventilator),
        },
        icu: {
          total: parseInt(total.icu),
          available: available.icuOver ? 0 : parseInt(available.icu),
          occupied: available.icuOver
            ? parseInt(total.icu)
            : parseInt(total.icu) - parseInt(available.icu),
        },
        general: {
          total: parseInt(total.general),
          available: available.generalOver ? 0 : parseInt(available.general),
          occupied: available.generalOver
            ? parseInt(total.general)
            : parseInt(total.general) - parseInt(available.general),
        },
      };
      hospitals.push(hospital);
    } catch {
      console.log({ name, availabilityText, totalText });
      continue;
    }
  }

  return hospitals;
}

export async function getGurgaonPageData(
  browser: Browser
): Promise<LocationData<"gurugram">[]> {
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
    const $ = cheerio.load(await page.content());

    const tab0 = $("#tab0 .psahuDiv");
    const tab1 = $("#tab1 .psahuDiv");

    let hospitals = [...getTabData($, tab0), ...getTabData($, tab1, "ccc")];

    await page.close();
    return [
      {
        name: "gurugram",
        state: "HR",
        hospitals,
        options: {
          getPhone: true,
          onlyHasAvailable: false,
          useAddressForSearch: false,
        },
      },
    ];
  } catch (err) {
    console.log("Gurugram page failed\n" + err);
    await page.close();
    return [];
  }
}
