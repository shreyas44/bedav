import { Availability, HospitalData, LocationData } from "./types";
import {
  AvailabilityUpdate,
  Category,
  Hospital,
  Location,
  Prisma,
  PrismaClient,
  State,
  StateAbbreviation,
} from ".prisma/client";

import { states } from "./utils";

const prisma = new PrismaClient();

async function getState(abbr: StateAbbreviation): Promise<State> {
  let state = await prisma.state.findUnique({
    where: { abbreviation: abbr },
  });

  if (state === null)
    state = await prisma.state.create({
      data: {
        abbreviation: abbr,
        name: states[abbr],
      },
    });

  return state;
}

async function getLocation(
  locationName: string,
  stateId: StateAbbreviation
): Promise<Location> {
  let location = await prisma.location.findUnique({
    where: { name: locationName },
  });

  if (location === null) {
    const state = await getState(stateId);
    location = await prisma.location.create({
      data: {
        name: locationName,
        stateId: state.id,
      },
    });
  }
  return location;
}

async function getHospital(
  hospitalData: HospitalData,
  locationId: string
): Promise<Hospital> {
  let hospital = await prisma.hospital.findUnique({
    where: {
      name_locationId: {
        name: hospitalData.name,
        locationId,
      },
    },
  });

  if (hospital === null)
    hospital = await prisma.hospital.create({
      data: {
        name: hospitalData.name,
        address: hospitalData.address,
        phone: hospitalData.phone,
        latitude: hospitalData.coordiantes?.latitude,
        longitude: hospitalData.coordiantes?.longitutde,
        locationId: locationId,
        website: hospitalData.website,
        email: hospitalData.email,
        placeId: hospitalData.placeId,
      },
    });

  return hospital;
}

function getSaveableUpdate(
  category: Category,
  data: Availability,
  hospitalId: string
): Prisma.AvailabilityUpdateCreateManyInput {
  return {
    category,
    occupied: data.occupied ?? null,
    available: data.available,
    total: data.total ?? null,
    timestamp: Math.floor(Date.now() / 1000),
    hospitalId: hospitalId,
  };
}

export async function getObjects(
  locations: LocationData[]
): Promise<LocationData[]> {
  const filledLocations: LocationData[] = [];

  for (const location of locations) {
    const filledLocationHospitals: HospitalData[] = [];
    const locationObject = await getLocation(location.name, location.state);

    for (const hospital of location.hospitals) {
      const hospitalObject = await getHospital(hospital, locationObject.id);
      filledLocationHospitals.push({
        ...hospital,
        object: hospitalObject,
      });
    }

    filledLocations.push({
      ...location,
      object: locationObject,
      hospitals: filledLocationHospitals,
    });
  }

  return filledLocations;
}

async function saveLatestUpdates(
  updates: Prisma.AvailabilityUpdateCreateManyInput[]
): Promise<void> {
  // @ts-ignore
  for (const update of updates) {
    await prisma.latestAvailability.upsert({
      where: {
        hospitalId_category: {
          hospitalId: update.hospitalId,
          category: update.category,
        },
      },
      update: {
        available: update.available,
        occupied: update.occupied,
        total: update.total,
        timestamp: update.timestamp,
      },
      create: {
        ...update,
      },
    });
  }
}

export async function saveUpdates(locations: LocationData[]): Promise<void> {
  const updates: Prisma.AvailabilityUpdateCreateManyInput[] = [];
  for (const location of locations) {
    for (const hospital of location.hospitals) {
      const { icu, hdu, general, oxygen, ventilator } = hospital;
      const hospitalId = (hospital.object && hospital.object.id) as string;

      if (icu) updates.push(getSaveableUpdate("icu", icu, hospitalId));
      if (hdu) updates.push(getSaveableUpdate("hdu", hdu, hospitalId));
      if (general)
        updates.push(getSaveableUpdate("general", general, hospitalId));
      if (oxygen) updates.push(getSaveableUpdate("oxygen", oxygen, hospitalId));
      if (ventilator)
        updates.push(getSaveableUpdate("ventilator", ventilator, hospitalId));
    }
  }

  await prisma.availabilityUpdate.createMany({ data: updates });
  await saveLatestUpdates(updates);
  await prisma.$disconnect();
}
