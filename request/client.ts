// ./apollo-client.js

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://student-salary-api.an.r.appspot.com/query"
      : "http://localhost:8080/query",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
export default client;
