import { Category, Hospital } from ".prisma/client";

import DataLoader from "dataloader";
import { prisma } from "../prisma/client";

type ReturnType = {
  hospitalId: string;
  available: number;
  occupied: number | null;
  total: number | null;
};

function getSortedValues(
  hospitalIds: readonly string[],
  results: ReturnType[]
) {
  const temp: { [id: string]: ReturnType } = {};

  for (const result of results) {
    temp[result.hospitalId] = result;
  }

  const values: ReturnType[] = [];

  for (const id of hospitalIds) {
    values.push(temp[id] || null);
  }

  return values;
}

function getAvailabilityDataLoader(category: Category) {
  return new DataLoader<string, ReturnType>(
    async (hospitalIds) => {
      const updates = await prisma.latestAvailabilityUpdate.findMany({
        select: {
          hospitalId: true,
          available: true,
          occupied: true,
          total: true,
        },
        where: {
          category,
          hospitalId: {
            in: [...hospitalIds],
          },
        },
      });

      return getSortedValues(hospitalIds, updates);
    },
    { cache: true }
  );
}

export const icuLoader = getAvailabilityDataLoader("icu");
export const hduLoader = getAvailabilityDataLoader("hdu");
export const oxygenLoader = getAvailabilityDataLoader("oxygen");
export const generalLoader = getAvailabilityDataLoader("general");
export const ventilatorLoader = getAvailabilityDataLoader("ventilator");
