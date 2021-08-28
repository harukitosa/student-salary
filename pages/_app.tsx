import "../styles/globals.css";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { Header } from "../component/header";
import { Footer } from "../component/footer";
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

const themes = {
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
      },
    },
  },
};
const theme = extendTheme({ themes });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Header />
        <Container maxW={"6xl"}>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
