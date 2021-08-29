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
import { HeadInformation } from ".";

const link = createHttpLink({
  uri: "https://student-salary-api.an.r.appspot.com/query",
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
    <>
    <HeadInformation/>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Header />
        <Container maxW={"6xl"}>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </ApolloProvider>
    </ChakraProvider>
    </>
  );
}

export default MyApp;
