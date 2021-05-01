import { HospitalData, LocationData } from "./types";

import { Browser } from "puppeteer";

export async function getLucknowPageData(
  browser: Browser
): Promise<LocationData[]> {
  const page = await browser.newPage();
  const hospitals: HospitalData[] = [];

  try {
    return [
      {
        name: "lucknow",
        state: "UP",
        options: {
          getPhone: true,
          onlyHasAvailable: false,
          useAddressForSearch: false,
        },
        hospitals,
      },
    ];
  } catch (err) {
    console.log("Lucknow page failed\n", err);
    return [];
  }
}
