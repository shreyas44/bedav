// @ts-nocheck

import { Browser } from "puppeteer";
import { LocationData } from "./types";
import { PdfReader } from "pdfreader";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { savePdf } from "./utils";

const BASE_URL = "https://ahna.org.in/";
const URL = BASE_URL + "covid19.html";

function getTableData(file: Buffer) {
  const nbCols = 12;
}

export async function getAhmdebadPageData(
  browser: Browser
): Promise<LocationData> {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle0" });
  const $ = cheerio.load(await page.content());

  const pdfName = $($("iframe")[1]).attr("src") as string;
  const pdfUrl = BASE_URL + pdfName;
  const file = await savePdf(pdfUrl, pdfName);

  new PdfReader().parseBuffer(file, (err: any, item: any) => {
    console.log(item.text);
  });

  return {};
}
