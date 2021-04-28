import { HospitalData, LocationData } from "./types";

import fs from "fs";
import https from "https";
import path from "path";

export const states = {
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chandigarh",
  CH: "Chhattisgarh",
  DN: "Dadra and Nagar Haveli",
  DD: "Daman and Diu",
  DL: "Delhi",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JK: "Jammu and Kashmir",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PY: "Puducherry",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TS: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UK: "Uttarakhand",
  WB: "West Bengal",
};

export function mergeHospitals(hospitals: HospitalData[]): HospitalData[] {
  const mergedHospitals: { [key: string]: HospitalData } = {};
  for (const hospital of hospitals) {
    if (!mergedHospitals[hospital.name]) {
      mergedHospitals[hospital.name] = hospital;
      continue;
    }

    mergedHospitals[hospital.name] = {
      ...mergedHospitals[hospital.name],
      ...hospital,
    };
  }

  return Object.values(mergedHospitals);
}

export function savePdf(url: string, filename: string): Promise<Buffer> {
  if (!fs.existsSync(path.join(__dirname, "temp"))) {
    fs.mkdirSync(path.join(__dirname, "temp"));
  }

  const filePath = path.join(__dirname, "temp", filename);

  let responseResolve: (value: Buffer) => void;
  let responseReject: (reason?: unknown) => void;

  const responsePromise = new Promise<Buffer>((resolve, reject) => {
    responseResolve = resolve;
    responseReject = reject;
  });

  const file = fs.createWriteStream(filePath, { flags: "w" });

  const request = https.get(url, (response) => {
    response
      .pipe(file)
      .on("finish", () => responseResolve(fs.readFileSync(filePath)));
  });

  request.on("error", () => {
    file.close();
    responseReject("An error occured");
  });

  return responsePromise;
}

export function deletePdf(filename: string) {
  fs.unlinkSync(`./temp/${filename}`);
}

export function getIndexOfLocation(
  location: string,
  locationData: LocationData[]
) {
  for (let i = 0; i < locationData.length; i++) {
    if (location === locationData[i].name) return i;
  }

  return -1;
}

export function mergeLocationHospitals(locations: LocationData[]) {
  const mergedLocations: LocationData[] = [];
  for (const location of locations) {
    const index = getIndexOfLocation(location.name, mergedLocations);
    if (index === -1) {
      mergedLocations.push(location);
    } else {
      mergedLocations[index] = {
        ...location,
        hospitals: [...mergedLocations[index].hospitals, ...location.hospitals],
      };
    }
  }

  return mergedLocations;
}

export function mergeLocationData(arrays: LocationData[][]) {
  const locations: LocationData[] = [];

  for (const array of arrays) {
    for (const item of array) {
      locations.push(item);
    }
  }

  return locations;
}

export function cleanLocationNames(locations: LocationData[]) {
  const cleanedLocations: LocationData[] = [];
  for (const location of locations) {
    const cleanedLocation = location;
    cleanedLocation.name = location.name.replace(/ /g, "_");
    cleanedLocations.push(cleanedLocation);
  }

  return cleanedLocations;
}
