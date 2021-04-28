import { Availability, HospitalData, LocationData } from "./types";
import {
  Category,
  Location,
  PrismaClient,
  StateAbbreviation,
} from ".prisma/client";
import { LatestAvailabilityUpdate, Prisma } from "@prisma/client";

import { states } from "./utils";

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

export async function saveData(
  locations: LocationData[],
  timestamp: number
): Promise<void> {
  const prisma = new PrismaClient();

  for (const location of locations) {
    if (!Object.keys(states).includes(location.state)) {
      console.log(location.state, states[location.state]);
    }
    const locationObject = await prisma.location.upsert({
      where: {
        name_stateId: {
          name: location.name,
          stateId: location.state,
        },
      },
      update: {},
      create: {
        name: location.name,
        state: {
          connectOrCreate: {
            where: {
              id: location.state,
            },
            create: {
              id: location.state,
              name: states[location.state],
            },
          },
        },
      },
    });

    for (const hospital of location.hospitals) {
      const updates = getSaveableUpdates(hospital, timestamp);

      await prisma.hospital.upsert({
        where: {
          name_locationId: {
            locationId: locationObject.id,
            name: hospital.name,
          },
        },
        update: {
          availability: {
            createMany: { data: updates },
          },
        },
        create: {
          name: hospital.name,
          address: hospital.address,
          phone: hospital.phone,
          latitude: hospital.coordinates?.longitude,
          longitude: hospital.coordinates?.latitude,
          website: hospital.website,
          locationId: locationObject.id,
          lastUpdateAt: timestamp,

          availability: {
            createMany: { data: updates },
          },
        },
      });
    }
  }

  await prisma.$disconnect();
  await saveLatestUpdate();
}

export async function saveLatestUpdate() {
  const prisma = new PrismaClient();

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
  await prisma.$disconnect();
}
