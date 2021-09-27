import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "../component/header";
import { Footer } from "../component/footer";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Head from "next/dist/next-server/lib/head";
import * as gtag from "../libs/gtag";
import { useEffect } from "react";
import router from "next/router";

const link = createHttpLink({
  uri: "https://student-salary-api.an.r.appspot.com/query",
  // uri: "http://localhost:8080/query",
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
  useEffect(() => {
    if (!gtag.existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      console.log(path);
      gtag.pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <>
      <Head>
        {gtag.existsGaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtag.GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
        <link rel="icon" sizes="16x16" href="/favcon.png" />
        <link rel="icon" type="image/svg+xml" href="/favcon.png"></link>
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
