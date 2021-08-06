// ./apollo-client.js

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:8080/query",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
export default client;
