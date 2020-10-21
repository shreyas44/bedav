import { ApolloClient, InMemoryCache } from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'

const cache =  new InMemoryCache({
  typePolicies: {
    Locality: {
      keyFields: ["name", "state"]
    }
  }
})

persistCache({
  cache,
  storage: window.localStorage
})

const client = new ApolloClient({
  cache,
  uri: "/graphql/",
  connectToDevTools: true
})


export default client
