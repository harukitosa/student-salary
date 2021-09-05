import { Center, Container, Text } from "@chakra-ui/layout";
import Image from "next/image";

export const ErrorPage = () => {
  return (
    <Container h={"100vh"} maxW="lg">
      <Center>
        <Image
          src="/error.png"
          width={"300"}
          height={"300"}
          alt={"error image"}
        />
      </Center>
      <Center>
        <Text fontSize={32} fontWeight={"bold"}>
          Error(Status 500)
        </Text>
      </Center>
      <Center>
        <Text fontSize={18}>解決までお待ちください</Text>
      </Center>
    </Container>
  );
};
