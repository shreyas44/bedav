import Prisma, { PrismaPromise, StateAbbreviation } from ".prisma/client";
import { enumType, objectType } from "nexus";
import {
  generalLoader,
  hduLoader,
  icuLoader,
  oxygenLoader,
  ventilatorLoader,
} from "./loaders";
import { getConnection, getPrismaPaginationArgs } from "../utils";

export const StateAbbreviationEnum = enumType({
  name: "StateAbbreviation",
  members: [
    "AN",
    "AP",
    "AR",
    "AS",
    "BR",
    "CG",
    "CH",
    "DN",
    "DD",
    "DL",
    "GA",
    "GJ",
    "HR",
    "HP",
    "JK",
    "JH",
    "KA",
    "KL",
    "LA",
    "LD",
    "MP",
    "MH",
    "MN",
    "ML",
    "MZ",
    "NL",
    "OR",
    "PY",
    "PB",
    "RJ",
    "SK",
    "TN",
    "TS",
    "TR",
    "UP",
    "UK",
    "WB",
  ],
});

export const BedCategory = enumType({
  name: "BedCategory",
  members: ["icu", "hdu", "general", "oxygen", "ventilator"],
});

export const HospitalType = enumType({
  name: "HospitalType",
  members: ["gov", "pri", "ccc", "dch", "dchc"],
});

export const Country = objectType({
  name: "Country",
  definition(t) {
    t.connectionField("states", {
      type: "State",
      // @ts-ignore
      resolve(country, args, ctx) {
        const paginationArgs = getPrismaPaginationArgs(args);

        return getConnection({
          args,
          nodes: ctx.prisma.state.findMany({
            skip: paginationArgs.skip,
            take: paginationArgs.take,
            cursor: paginationArgs.cursor as { id: StateAbbreviation },
          }),
        });
      },
    });

    t.connectionField("locations", {
      type: "Location",
      // @ts-ignore
      resolve(country, args, ctx) {
        const paginationArgs = getPrismaPaginationArgs(args);

        return getConnection({
          args,
          nodes: ctx.prisma.location.findMany({
            ...paginationArgs,
            orderBy: [
              {
                stateId: "asc",
              },
              {
                name: "asc",
              },
            ],
          }),
        });
      },
    });

    t.field("availability", {
      type: "Availability",
      async resolve(country, args, ctx) {
        const result = await ctx.prisma.latestAvailabilityUpdate.aggregate({
          sum: {
            total: true,
            occupied: true,
            available: true,
          },
        });

        return result.sum;
      },
    });

    t.nonNull.int("lastUpdated", {
      async resolve(country, args, ctx) {
        const result = await ctx.prisma.latestAvailabilityUpdate.aggregate({
          max: {
            timestamp: true,
          },
        });

        return result.max.timestamp as number;
      },
    });
  },
});

export const State = objectType({
  name: "State",
  definition(t) {
    t.nonNull.field("id", { type: "StateAbbreviation" });
    t.nonNull.string("name");

    t.connectionField("locations", {
      type: "Location",
      // @ts-ignore
      resolve(state, args, ctx) {
        const paginationArgs = getPrismaPaginationArgs(args);

        return getConnection({
          args,
          nodes: ctx.prisma.state
            .findUnique({ where: { id: state.id } })
            .locations({ ...paginationArgs }),
        });
      },
    });

    t.field("availability", {
      type: "Availability",
      async resolve(state, args, ctx) {
        const result = await ctx.prisma.latestAvailabilityUpdate.aggregate({
          sum: {
            total: true,
            occupied: true,
            available: true,
          },
          where: {
            hospital: {
              location: {
                stateId: state.id,
              },
            },
          },
        });

        return result.sum;
      },
    });

    t.nonNull.int("lastUpdated");
  },
});

export const Location = objectType({
  name: "Location",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");

    t.nonNull.field("state", {
      type: "State",
      resolve(location, args, ctx) {
        return ctx.prisma.location
          .findUnique({
            where: { id: location.id },
          })
          .state() as PrismaPromise<Prisma.State>;
      },
    });

    t.connectionField("hospitals", {
      type: "Hospital",
      // @ts-ignore
      resolve(location, args, ctx) {
        const paginationArgs = getPrismaPaginationArgs(args);
        return getConnection({
          args,
          nodes: ctx.prisma.location
            .findUnique({ where: { id: location.id } })
            .hospitals({ ...paginationArgs }),
        });
      },
    });

    t.field("availability", {
      type: "Availability",
      async resolve(location, args, ctx) {
        const result = await ctx.prisma.latestAvailabilityUpdate.aggregate({
          sum: {
            total: true,
            occupied: true,
            available: true,
          },
          where: {
            hospital: {
              locationId: location.id,
            },
          },
        });

        return result.sum;
      },
    });

    t.nonNull.int("lastUpdated");
  },
});

export const Hospital = objectType({
  name: "Hospital",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");

    t.float("latitude");
    t.float("longitude");
    t.string("address");

    t.string("phone");
    t.string("email");
    t.string("website");

    t.string("placeId");

    t.field("category", { type: "HospitalType" });

    t.field("icu", {
      type: "Availability",
      resolve(hospital) {
        return icuLoader.load(hospital.id);
      },
    });

    t.field("hdu", {
      type: "Availability",
      resolve(hospital) {
        return hduLoader.load(hospital.id);
      },
    });

    t.field("general", {
      type: "Availability",
      resolve(hospital) {
        return generalLoader.load(hospital.id);
      },
    });

    t.field("oxygen", {
      type: "Availability",
      resolve(hospital) {
        return oxygenLoader.load(hospital.id);
      },
    });

    t.field("ventilator", {
      type: "Availability",
      resolve(hospital) {
        return ventilatorLoader.load(hospital.id);
      },
    });

    t.field("location", {
      type: "Location",
      resolve(hospital, args, ctx) {
        return ctx.prisma.hospital
          .findUnique({ where: { id: hospital.id } })
          .location();
      },
    });

    t.nonNull.int("lastUpdated");
  },
});

export const Availability = objectType({
  name: "Availability",
  definition(t) {
    t.int("available");
    t.int("occupied");
    t.int("total");
  },
});
