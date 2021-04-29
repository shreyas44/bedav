import { Availability, LocationData } from "./types";

import { HospitalData } from "./types";
import { HospitalType } from "@prisma/client";
import cheerio from "cheerio";
import { getIndexOfLocation } from "../utils";
import puppeteer from "puppeteer";

// pune, kohlapur, sangli, satara, solapur

const URL = "https://www.divcommpunecovid.com/ccsbeddashboard/hsr";

function getNameAddressPhone(string: string) {
  let split_string = string.split("Address:");
  const name = split_string[0].trim();

  split_string = split_string[1].split("Number:");
  const address = split_string[0].trim();

  split_string = split_string[1].split("Last Updated Date:");
  let phone = split_string[0].trim();

  if (phone.includes("/")) {
    phone = phone.split("/")[0].trim();
  } else if (phone.includes(",")) {
    phone = phone.split(",")[0].trim();
  }

  return {
    name,
    address,
    phone,
  };
}

const getAvailability: (args: {
  total: number;
  available: number;
}) => Availability = ({ total, available }) => ({
  total,
  available,
  occupied: total - available,
});

function getTableData($: cheerio.Root) {
  const hospitals: HospitalData[] = [];

  const rows = $("#tablegrid").children("tbody").children("tr");
  for (const row of rows) {
    const columns: string[] = [];
    $(row)
      .children("td")
      .each((index, elm) => columns.push($(elm).text().trim()));

    const hospital: HospitalData = {
      ...getNameAddressPhone(columns[4]),
      category: columns[3].toLowerCase() as HospitalType,
      general: getAvailability({
        available: parseInt(columns[10]),
        total: parseInt(columns[9]),
      }),
      oxygen: getAvailability({
        available: parseInt(columns[12]),
        total: parseInt(columns[11]),
      }),
      icu: getAvailability({
        total: parseInt(columns[13]) + parseInt(columns[15]),
        available: parseInt(columns[14]) + parseInt(columns[16]),
      }),
      ventilator: getAvailability({
        available: parseInt(columns[16]),
        total: parseInt(columns[15]),
      }),
    };

    hospitals.push(hospital);
  }

  return hospitals;
}

async function getDistrictPageData(
  page: puppeteer.Page
): Promise<HospitalData[]> {
  const html = await page.content();
  const $ = cheerio.load(html);

  const hospitals = getTableData($);

  const nextButtonText = $("span > a").last().text().toLowerCase();
  if (!nextButtonText || nextButtonText === "last") return hospitals;
  await Promise.all([
    page.click("span > a:last-child"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  const nextHospitals = await getDistrictPageData(page);
  return [...hospitals, ...nextHospitals];
}

export async function getPunePageData(
  browser: puppeteer.Browser
): Promise<LocationData[]> {
  const page = await browser.newPage();

  const cityValues = {
    pune: "phc_center_1",
    solapur: "phc_center_2",
    satara: "phc_center_3",
    sangli: "phc_center_4",
    kohlapur: "phc_center_5",
  };

  const options: LocationData["options"] = {
    getPhone: true,
    useAddressForSearch: false,
    onlyHasAvailable: false,
  };

  const locations: LocationData<keyof typeof cityValues>[] = [
    {
      name: "pune",
      state: "MH",
      hospitals: [],
      options,
    },
    {
      name: "solapur",
      state: "MH",
      hospitals: [],
      options,
    },
    {
      name: "satara",
      state: "MH",
      hospitals: [],
      options,
    },
    {
      name: "sangli",
      state: "MH",
      hospitals: [],
      options,
    },
    {
      name: "kohlapur",
      state: "MH",
      hospitals: [],
      options,
    },
  ];

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });

    let city: keyof typeof cityValues;
    for (city in cityValues) {
      await page.$eval(
        ".dropdownmedium",
        (el, city) => (el.value = city),
        cityValues[city]
      );
      await Promise.all([
        page.click("#employee_0"),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);

      const cityHospitals = await getDistrictPageData(page);
      const index = getIndexOfLocation(city, locations);
      locations[index].hospitals = cityHospitals;
    }

    await page.close();
    return locations;
  } catch (err) {
    console.log("Pune page failed\n" + err);

    await page.close();
    return [];
  }
}
