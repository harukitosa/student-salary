import {
  Container,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  chakra,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { DataTable } from "../../component/simpletable";
import { ErrorPage } from "../../component/error";
import { Review, useCompanyQuery } from "../../src/generated/graphql";

export default function WorkInfo() {
  const router = useRouter();
  const { loading, error, data } = useCompanyQuery({
    variables: { name: router.query.name as string },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;
  console.log(data);
  return (
    <Container maxW={"5xl"}>
      <Heading pt={8} pb={8}>
        <Text
          as={"span"}
          position={"relative"}
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          _after={{
            content: "''",
            width: "full",
            position: "absolute",
            bottom: 1,
            left: 0,
            bg: "blue.400",
            height: "20%",
            zIndex: -1,
          }}
        >
          {data.company[0].name}
        </Text>
        <br />{" "}
        <Text color={"blue.400"} as={"span"} fontSize={"2xl"}>
          登録件数: {data.company[0].count}
        </Text>{" "}
      </Heading>
      <Text fontSize={20} fontWeight={700}>
        データ
      </Text>
      <DataTable data={data.company[0].workdata} />
    </Container>
  );
}
