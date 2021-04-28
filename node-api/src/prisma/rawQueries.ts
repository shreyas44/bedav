import {
  Location,
  PrismaClient,
  State,
  StateAbbreviation,
} from ".prisma/client";

interface LocationWhere {
  stateId: StateAbbreviation;
}

interface LocationArgs {
  where?: LocationWhere;
  skip?: number;
  take?: number;
  cursor?: {
    id: string;
  };
}

interface StateArgs {
  skip?: number;
  take?: number;
  cursor?: {
    id: string;
  };
}

type LocationsRawResult = (Location & {
  total: number | null;
  occupied: number | null;
  available: number | null;
})[];

type StatesRawResult = (State & {
  total: number | null;
  occupied: number | null;
  available: number | null;
})[];

interface CountryResult {
  total: number | null;
  occupied: number | null;
  available: number | null;
}

export function getLocations(prisma: PrismaClient, args?: LocationArgs) {
  const getWhereClause = () => {
    let clause = "";

    if (args?.where?.stateId && args.cursor) {
      clause = `WHERE location."stateId"='${args.where.stateId}' AND location.id <= '${args.cursor}'`;
    } else if (args?.where?.stateId) {
      clause = `WHERE location."stateId"='${args.where.stateId}'`;
    } else if (args?.cursor) {
      clause = `WHERE location.id <= '${args.cursor}'`;
    }

    return clause;
  };

  return prisma.$queryRaw<LocationsRawResult>(`
    SELECT location.*, SUM(available) available, SUM(occupied) occupied, SUM(total) total FROM "AvailabilityUpdates" 
    LEFT JOIN (SELECT MAX(timestamp) "latestTimestamp", "hospitalId" FROM "AvailabilityUpdates" GROUP BY "hospitalId") latest 
    ON "AvailabilityUpdates"."hospitalId" = latest."hospitalId" AND "AvailabilityUpdates"."timestamp" = latest."latestTimestamp"
    LEFT JOIN "Hospitals" hospital
    ON hospital."id" = latest."hospitalId"
    LEFT JOIN "Locations" location
    ON location."id" = hospital."locationId"
    ${getWhereClause()}
    GROUP BY location."id", location."name", location."stateId"
    ${args?.cursor ? `ORDERY BY location.id` : ""}
    ${args?.skip ? `OFFSET ${args.skip}` : ""}
    ${args?.take ? `LIMIT ${args.take}` : ""};
  `);
}

export function getStates(prisma: PrismaClient, args?: StateArgs) {
  return prisma.$queryRaw<StatesRawResult>(`
    SELECT state.*, SUM(available) available, SUM(occupied) occupied, SUM(total) total FROM "AvailabilityUpdates" 
    LEFT JOIN (SELECT MAX(timestamp) "latestTimestamp", "hospitalId" FROM "AvailabilityUpdates" GROUP BY "hospitalId") latest 
    ON "AvailabilityUpdates"."hospitalId" = latest."hospitalId" AND "AvailabilityUpdates"."timestamp" = latest."latestTimestamp"
    LEFT JOIN "Hospitals" hospital
    ON hospital.id = latest."hospitalId"
    LEFT JOIN "Locations" location
    ON location.id = hospital."locationId"
    LEFT JOIN "States" state
    ON state.id = location."stateId"
    ${args?.cursor ? `WHERE state.id <= ${args.cursor}` : ""}
    GROUP BY state.id, state.name
    ${args?.cursor ? `ORDERY BY state.id` : ""}
    ${args?.skip ? `OFFSET ${args.skip}` : ""}
    ${args?.take ? `LIMIT ${args.take}` : ""};
  `);
}

export function getCountry(prisma: PrismaClient) {
  return prisma.$queryRaw<CountryResult>(`
    SELECT SUM(available) available, SUM(occupied) occupied, SUM(total) total FROM "AvailabilityUpdates" 
    LEFT JOIN (SELECT MAX(timestamp) "latestTimestamp", "hospitalId" FROM "AvailabilityUpdates" GROUP BY "hospitalId") latest 
    ON "AvailabilityUpdates"."hospitalId" = latest."hospitalId" AND "AvailabilityUpdates"."timestamp" = latest."latestTimestamp"
    LEFT JOIN "Hospitals" hospital
    ON hospital.id = latest."hospitalId"
    LEFT JOIN "Locations" location
    ON location.id = hospital."locationId"
    LEFT JOIN "States" state
    ON state.id = location."stateId"
  `);
}
