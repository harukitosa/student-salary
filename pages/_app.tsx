import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import {Header} from "../component/header"
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
