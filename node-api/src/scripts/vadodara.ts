import { HospitalData, LocationData } from "./types";
import puppeteer, { Browser } from "puppeteer";

import cheerio from "cheerio";

// vadodara city

const URL =
  "https://vmc.gov.in/Covid19VadodaraApp/HospitalBedsDetails.aspx?tid=1";

const HOSPITAL_URL =
  "https://vmc.gov.in/Covid19VadodaraApp/BedDetails.aspx?HOSP_ID=";

function getHospitalIdsFromTable($: cheerio.Root, tableId: string): string[] {
  const rows = $(`#${tableId}`).children("tbody").children("tr").slice(1);
  const links: string[] = [];

  for (const row of rows) {
    let href = $(row).children("td").first().children("a").attr("href");
    href = href?.split("HOSP_ID")[1].slice(1) as string;
    links.push(href);
  }

  return links;
}

async function getHospitalData(
  browser: Browser,
  hospitalId: string
): Promise<HospitalData | undefined> {
  const page = await browser.newPage();
  try {
    await page.goto(`${HOSPITAL_URL}${hospitalId}`, {
      waitUntil: "networkidle0",
    });
  } catch {
    await page.close();
    return;
  }

  const $ = cheerio.load(await page.content());

  const name = $("table")
    .first()
    .children("tbody")
    .children("tr")
    .first()
    .children("td")
    .last()
    .text()
    .trim();

  const dataTable = $("table").last().children("tbody").children("tr").slice(2);
  const totalRow = $(dataTable[0]);
  const occupiedRow = $(dataTable[1]);
  const availableRow = $(dataTable[2]);

  const hospital: HospitalData = {
    name,
    icu: {
      available: parseInt(
        availableRow.children("td:nth-child(5)").text().trim()
      ),
      total: parseInt(totalRow.children("td:nth-child(5)").text().trim()),
      occupied: parseInt(occupiedRow.children("td:nth-child(5)").text().trim()),
    },
    oxygen: {
      available: parseInt(
        availableRow.children("td:nth-child(6)").text().trim()
      ),
      total: parseInt(totalRow.children("td:nth-child(6)").text().trim()),
      occupied: parseInt(occupiedRow.children("td:nth-child(6)").text().trim()),
    },
    general: {
      available: parseInt(
        availableRow.children("td:nth-child(7)").text().trim()
      ),
      total: parseInt(totalRow.children("td:nth-child(7)").text().trim()),
      occupied: parseInt(occupiedRow.children("td:nth-child(7)").text().trim()),
    },
    ventilator: {
      available:
        parseInt(availableRow.children("td:nth-child(3)").text().trim()) +
        parseInt(availableRow.children("td:nth-child(4)").text().trim()),
      total:
        parseInt(totalRow.children("td:nth-child(3)").text().trim()) +
        parseInt(totalRow.children("td:nth-child(4)").text().trim()),
      occupied:
        parseInt(occupiedRow.children("td:nth-child(3)").text().trim()) +
        parseInt(occupiedRow.children("td:nth-child(4)").text().trim()),
    },
  };

  await page.close();
  return hospital;
}

export async function getVadodaraPageData(
  browser: Browser
): Promise<LocationData<"vadodara">[]> {
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0" });
    const $ = cheerio.load(await page.content());

    const ids = [
      "ContentPlaceHolder1_GVHospSegment1",
      "ContentPlaceHolder1_GVHospSegment2",
    ];
    let hospitalIds: string[] = [];

    for (const id of ids) {
      hospitalIds = [...hospitalIds, ...getHospitalIdsFromTable($, id)];
    }

    const hospitalPromises: Promise<HospitalData | undefined>[] = [];
    for (const hospitalId of hospitalIds) {
      hospitalPromises.push(getHospitalData(browser, hospitalId));
    }

    const hospitals = (await Promise.all(hospitalPromises)).filter(
      (hospital) => typeof hospital !== "undefined"
    ) as HospitalData[];

    await page.close();

    return [
      {
        name: "vadodara",
        state: "GJ",
        hospitals,
      },
    ];
  } catch (err) {
    console.log("Vadodara page failed\n" + err);
    return [];
  }
}
