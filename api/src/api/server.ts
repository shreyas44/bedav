import { ApolloServer } from "apollo-server";
import { prisma } from "../prisma/client";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: { prisma },
  playground: true,
});

const startServer = async () => {
  await prisma.$connect();
  const { url } = await server.listen({
    port: process.env.NODE_ENV === "production" ? 80 : 3000,
  });
  console.log(`🚀 Server running at ${url}`);
};

startServer();
