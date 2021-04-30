import { Availability, HospitalData, LocationData } from "./types";
import { Category, PrismaClient } from ".prisma/client";
import { LatestAvailabilityUpdate, Prisma } from "@prisma/client";
import {
  generalLoader,
  hduLoader,
  icuLoader,
  oxygenLoader,
  ventilatorLoader,
} from "../api/loaders";
import { getLocationCoordinates, getPlaceDetails, states } from "../utils";

import { Client } from "@googlemaps/google-maps-services-js";

function getSaveableUpdate(
  category: Category,
  data: Availability,
  timestamp: number
) {
  return {
    category,
    occupied: data.occupied ?? null,
    available: data.available,
    total: data.total ?? null,
    timestamp,
  };
}

function getSaveableUpdates(hospital: HospitalData, timestamp: number) {
  const { icu, hdu, general, ventilator, oxygen } = hospital;
  const updates: ReturnType<typeof getSaveableUpdate>[] = [];
  if (icu) updates.push(getSaveableUpdate("icu", icu, timestamp));
  if (hdu) updates.push(getSaveableUpdate("hdu", hdu, timestamp));
  if (general) updates.push(getSaveableUpdate("general", general, timestamp));
  if (oxygen) updates.push(getSaveableUpdate("oxygen", oxygen, timestamp));
  if (ventilator)
    updates.push(getSaveableUpdate("ventilator", ventilator, timestamp));

  return updates;
}

async function saveLatestTimestamps() {}

async function saveLatestUpdate(prisma: PrismaClient) {
  const locations = await prisma.location.findMany({
    include: {
      hospitals: {
        include: {
          availability: {
            orderBy: {
              timestamp: "desc",
            },
          },
        },
      },
    },
  });

  const updates: Prisma.Prisma__LatestAvailabilityUpdateClient<LatestAvailabilityUpdate>[] = [];

  for (const location of locations) {
    for (const hospital of location.hospitals) {
      const timestamps = hospital.availability.map(
        (update) => update.timestamp
      );
      const latestTimestamp = Math.max(...timestamps);
      const latestUpdates = hospital.availability.filter(
        (update) => update.timestamp === latestTimestamp
      );

      for (const update of latestUpdates) {
        const updatePromise = prisma.latestAvailabilityUpdate.upsert({
          where: {
            hospitalId_category: {
              hospitalId: hospital.id,
              category: update.category,
            },
          },
          update: {
            occupied: update.occupied,
            total: update.total,
            available: update.available,
            timestamp: update.timestamp,
          },
          create: {
            ...update,
            id: undefined,
          },
        });
        updates.push(updatePromise);
      }
    }
  }

  await prisma.$transaction(updates);
  icuLoader.clearAll();
  hduLoader.clearAll();
  ventilatorLoader.clearAll();
  generalLoader.clearAll();
  oxygenLoader.clearAll();
}

export async function saveData(
  locations: LocationData[],
  timestamp: number
): Promise<void> {
  const prisma = new PrismaClient();
  const maps = new Client();

  for (const location of locations) {
    if (location.hospitals.length > 0) continue;
    if (location.options?.onlyHasAvailable) continue;

    const locationObject = await prisma.location.upsert({
      where: {
        name_stateId: {
          name: location.name,
          stateId: location.state,
        },
      },
      update: {
        lastUpdated: timestamp,
        state: {
          update: {
            lastUpdated: timestamp,
          },
        },
      },
      create: {
        name: location.name,
        lastUpdated: timestamp,
        state: {
          connectOrCreate: {
            where: {
              id: location.state,
            },
            create: {
              id: location.state,
              name: states[location.state],
              lastUpdated: timestamp,
            },
          },
        },
      },
    });

    location.coordinates = await getLocationCoordinates({
      maps,
      name: location.name,
    });

    for (const hospital of location.hospitals) {
      const updates = getSaveableUpdates(hospital, timestamp);

      const hospitalObject = await prisma.hospital.findUnique({
        where: {
          name_locationId: {
            locationId: locationObject.id,
            name: hospital.name,
          },
        },
      });

      if (hospitalObject) {
        await prisma.hospital.update({
          where: {
            id: hospitalObject.id,
          },
          data: {
            category: hospital.category,
            availability: {
              createMany: { data: updates },
            },
          },
        });
      } else {
        const details = await getPlaceDetails({ maps, hospital, location });

        await prisma.hospital.create({
          data: {
            name: hospital.name,
            address: details?.formattedAddress || hospital.address,
            phone: details?.phone || hospital.phone,
            website: details?.website || hospital.website,
            placeId: details?.placeId,
            latitude: details?.coordinates?.latitude,
            longitude: details?.coordinates?.longitude,
            locationId: locationObject.id,
            category: hospital.category,
            lastUpdated: timestamp,

            availability: {
              createMany: { data: updates },
            },
          },
        });
      }
    }
  }

  await prisma.$disconnect();
  await saveLatestUpdate(prisma);
}
