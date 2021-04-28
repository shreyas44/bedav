import { Location, PrismaClient, StateAbbreviation } from ".prisma/client";

export interface Context {
  prisma: PrismaClient;
}

export interface LocationRaw extends Location {
  id: string;
  name: string;
  stateId: StateAbbreviation;
  total: number;
  occupied: number;
  available: number;
}
