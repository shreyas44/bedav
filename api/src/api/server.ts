import * as queries from "./queries";
import * as types from "./types";

import { connectionPlugin, makeSchema } from "nexus";

import { ApolloServer } from "apollo-server";
import { PrismaClient } from ".prisma/client";
import { join } from "path";

const prisma = new PrismaClient();

const schema = makeSchema({
  types: { ...types, ...queries },
  outputs: {
    typegen: join(__dirname, "..", "..", "generated", "nexus-typegen.d.ts"),
    schema: join(__dirname, "..", "..", "generated", "schema.graphql"),
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "Prisma",
      },
    ],
    mapping: {
      State: "Prisma.State",
      Location: "Prisma.Location",
      Hospital: "Prisma.Hospital",
    },
  },
  contextType: {
    module: require.resolve("./sourceTypes"),
    alias: "Context",
    export: "Context",
  },
  shouldGenerateArtifacts: process.env.NODE_ENV === "production" ? false : true,
  plugins: [connectionPlugin()],
});

const server = new ApolloServer({
  schema,
  context: { prisma },
});

server
  .listen({ port: 3000 })
  .then(({ url }) => console.log(`🚀 Server running at ${url}`));
