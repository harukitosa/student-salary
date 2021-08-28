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
  uri: "https://student-salary-api.an.r.appspot.com/query",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
export default client;
