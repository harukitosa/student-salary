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
import {
  HOMEPAGE_QUERY,
  HomepageData,
} from "../request/queries/homepage.query";
import { workdata } from "../types/workdata";
import client from "../request/client";

export async function getServerSideProps(context) {
  const { data } = await client.query<HomepageData>({ query: HOMEPAGE_QUERY });
  return {
    props: data,
  };
}

export default function Home(props: HomepageData) {
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
          num={props.workdatainfo.company_count}
        />
        <BlogPostWithImage
          title={"登録データ数"}
          num={props.workdatainfo.count}
        />
        <BlogPostWithImage
          title={"時給の中央値"}
          num={props.workdatainfo.mid}
        />
        <BlogPostWithImage
          title={"時給の平均値"}
          num={props.workdatainfo.avarage}
        />
      </SimpleGrid>
      <Box mt={12} bg={"blue.400"} w={40} p={2} rounded={"lg"}>
        <Text
          fontSize={"medium"}
          fontWeight={600}
          color={"white"}
          align={"center"}
        >
          登録件数が多い企業
        </Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 3, sm: 1 }} spacing={2} mt={6}>

        {props.company.map((item, index) => {
          return (
            <Box
            bg={useColorModeValue("white", "gray.800")}
            border={"1px"}
            padding={2}
            w={"full"}
            borderColor={"blackAlpha.200"}
            rounded={"md"}
        >
          <Heading fontSize={"xl"} fontFamily={"body"}>
            DMM
          </Heading>
          <Text>
            max: 3000円
          </Text>
          <Text>
            min: 1200円
          </Text>
          <Text>
            登録件数: 12
          </Text>
        </Box>
          );
        })} 
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
        {props.review.map((item, index) => {
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
      <SalaryTable data={props.workdatainfo.workdata} />
    </Container>
  );
}

const BlogPostWithImage = (props: {
  title: String;
  num: Number;
}) => {
  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      border={"1px"}
      borderColor={"blackAlpha.200"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Stack
        p={2}
        color={useColorModeValue("gray.800", "white")}
        align={"center"}
      >
        <Text fontSize={"sm"} p={1} px={1} color={"gray.600"} rounded={"md"}>
          {props.title}
        </Text>
        <Stack direction={"row"}>
          <Text fontSize={"3xl"} fontWeight={400}>
            {props.num}
          </Text>
        </Stack>
      </Stack>
    </Box>
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

const SalaryTable = (props: { data: workdata[] }) => {
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
