import {
  Container,
  Text,
  Center,
  Stack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Button,
  Box,
  Icon,
  useColorModeValue,
  SimpleGrid,
  color,
  ThemeTypings,
  Avatar,
  Badge,
  Link,
  TableCaption,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { title } from "process";
import React, { ReactNode } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import {
  HOMEPAGE_QUERY,
  HomepageData,
} from "../request/queries/homepage.query";
import { workdata } from "../types/workdata";

export default function Home() {
  // const { loading, error, data } = useQuery<HomepageData>(HOMEPAGE_QUERY);
  const query = useQuery<HomepageData>(HOMEPAGE_QUERY);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>error</p>;

  return (
    <Container maxW={"5xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          StudentSalary <br />
          <Text
            as={"span"}
            color={"blue.400"}
            fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
          >
            学生エンジニアの情報サイト
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          このwebサイトは日本の学生エンジニアから匿名であつめられた給与情報、インターンのクチコミを掲載しています。
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            colorScheme={"blue"}
            bg={"blue.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "blue.500",
            }}
          >
            時給を登録する
          </Button>
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            Learn more
          </Button>
        </Stack>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4, sm: 1 }} spacing={2}>
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"green.400"}
        />
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"blue.400"}
        />
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"orange.400"}
        />
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"pink.400"}
        />
      </SimpleGrid>
      <Box mt={12} bg={"blue.400"} w={32} p={2} rounded={"lg"}>
        <Text
          fontSize={"medium"}
          fontWeight={600}
          color={"white"}
          align={"center"}
        >
          新着レビュー
        </Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }}>
        {query.data &&
          query.data.review &&
          query.data.review.map((item, index) => {
            return (
              <SocialProfileSimple
                key={index}
                name={item.company_name}
                date={item.create_data_js}
                detail={item.report.substr(0, 20)}
              />
            );
          })}
      </SimpleGrid>
      {query.data && query.data.workdata && (
        <SalaryTable
          error={query.error != null}
          loading={query.loading}
          data={query.data.workdata}
        />
      )}
    </Container>
  );
}

const BlogPostWithImage = (props: {
  title: String;
  num: String;
  color: ThemeTypings["colorSchemes"] | (string & {});
}) => {
  return (
    <Center py={4}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        border={"1px"}
        borderColor={"blackAlpha.200"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={4}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={props.color}
            p={1}
            px={1}
            color={"white"}
            rounded={"md"}
          >
            {props.title}
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"} fontWeight={800}>
              {props.num}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

const SocialProfileSimple = (props: {
  name: String;
  date: String;
  detail: String;
}) => {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        border={"1px"}
        borderColor={"blackAlpha.200"}
        rounded={"lg"}
        p={3}
        textAlign={"center"}
      >
        <Heading fontSize={"xl"} fontFamily={"body"}>
          {props.name}
        </Heading>
        <Text fontWeight={300} color={"gray.500"} mb={4}>
          {props.date}
        </Text>
        <Text textAlign={"center"} px={3}>
          {props.detail}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={0}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Java
          </Badge>
        </Stack>
      </Box>
    </Center>
  );
};

const SalaryTable = (props: {
  loading: Boolean;
  error: Boolean;
  data: workdata[] | undefined;
}) => {
  // const { loading, error, data } = useQuery<HomepageData>(HOMEPAGE_QUERY);

  if (props.loading) return <p>Loading...</p>;
  if (props.error) return <p>error</p>;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>企業名</Th>
          <Th isNumeric>時給</Th>
          <Th>タイプ</Th>
          <Th>勤務期間</Th>
          <Th>経験年数</Th>
          <Th>週出勤日数</Th>
          <Th>雇用形態</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map((item, index) => {
          return (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td isNumeric>{item.salary}円</Td>
              <Td>{item.type}</Td>
              <Td>{item.term}</Td>
              <Td>{item.experience}年</Td>
              <Td>{item.workdays}</Td>
              <Td>{item.workType}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
