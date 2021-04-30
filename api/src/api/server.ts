import { ApolloServer } from "apollo-server";
import { executor } from "./executor";
import { prisma } from "../prisma/client";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: { prisma },
});

const startServer = async () => {
  await prisma.$connect();
  const { url } = await server.listen({ port: 3000 });
  console.log(`🚀 Server running at http://localhost:3000`);
};

startServer();
