import { PrismaClient } from ".prisma/client";

export const prisma = new PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

// prisma.$on("query", console.log);
prisma.$on("query", (e) =>
  console.log({ query: e.query, duration: e.duration })
);
