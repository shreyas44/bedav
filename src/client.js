import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: "/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Locality: {
        keyFields: ["name", "state"]
      }
    }
  }),
  connectToDevTools: true
})

export default client
