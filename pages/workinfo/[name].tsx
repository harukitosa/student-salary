import {
  Container,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  chakra,
  Avatar,
  Box,
  SimpleGrid
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { DataTable } from "../../component/simpletable";
import { ErrorPage } from "../../component/error";
import { useCompanyQuery } from "../../src/generated/graphql";
import { BlogPostWithImage } from "..";

export default function WorkInfo() {
  const router = useRouter();
  const { loading, error, data } = useCompanyQuery({
    variables: { name: router.query.name as string },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;
  console.log(data);
  let avg: number = 0;
 data.company[0].workdata.forEach(element => {
    avg += element.salary;
  });
  avg = avg/data.company[0].workdata.length;
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
        <br />
        <Box h="8"/>
        <SimpleGrid
        mt={"4"}
        columns={{ base: 1, md: 2, lg: 4, sm: 1 }}
        spacing={2}
      >
        <BlogPostWithImage
          title={"登録データ数"}
          num={data.company[0].count}
          icon={"/memory.svg"}
          unit={"件"}
        />
        <BlogPostWithImage
          title={"平均時給"}
          num={Math.round(avg)}
          icon={"/statistics.svg"}
          unit={"円"}
        />
        <BlogPostWithImage
          title={"時給の最小値"}
          num={data.company[0].min}
          icon={"/mouse.svg"}
          unit={"円"}
        />
        <BlogPostWithImage
          title={"時給の最大値"}
          num={data.company[0].max}
          icon={"/db.svg"}
          unit={"円"}
        />
        </SimpleGrid>
      </Heading>
      <Text fontSize={20} fontWeight={700}>
        データ
      </Text>
      <DataTable data={data.company[0].workdata} />
    </Container>
  );
}
