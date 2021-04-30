import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LocalForageWrapper, persistCache } from "apollo3-cache-persist";

import localForage from "localforage";

export default async function getClient() {
  const cache = new InMemoryCache();

  await persistCache({
    cache,
    storage: new LocalForageWrapper(localForage),
  });

  const client = new ApolloClient({
    cache,
    uri: "/graphql",
  });

  return client;
}
