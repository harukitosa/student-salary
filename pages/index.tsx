import {
  Text,
  Center,
  Stack,
  Heading,
  Button,
  Box,
  useColorModeValue,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import {
  HOMEPAGE_QUERY,
  HomepageData,
} from "../request/queries/homepage.query";
import { useQuery } from "@apollo/client";
import { DataTable } from "../component/simpletable";
import Link from "next/link";
import Image from "next/image";
import { ErrorPage } from "../component/error";

export default function Home() {
  const { loading, error, data } = useQuery<HomepageData>(HOMEPAGE_QUERY);
  if (loading) return <p>loading...</p>;
  if (error) return <ErrorPage />;

  return (
    <>
      <Box display={{ md: "flex" }}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
            lineHeight={"100%"}
          >
            StudentSalary <br />
            <Text
              as={"span"}
              color={"blue.400"}
              fontSize={{ base: "xl", sm: "3xl" }}
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
            <Link href={`/new`} passHref>
              <Button
                color={"blue.400"}
                border={"1px"}
                rounded={"full"}
                bg={"white"}
                px={2}
                width={"80"}
                _hover={{
                  bg: "blue.400",
                  color: "white",
                }}
              >
                時給を登録する
              </Button>
            </Link>
            <Link href={`/review/new`} passHref>
              <Button
                color={"blue.400"}
                border={"1px"}
                rounded={"full"}
                bg={"white"}
                px={2}
                width={"80"}
                _hover={{
                  bg: "blue.400",
                  color: "white",
                }}
              >
                インターンの口コミを書く
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Image
          src={"/icon.svg"}
          alt="studentsalary"
          width={"850"}
          height={"850"}
        />
      </Box>

      <Box mt={12} bg={"blue.400"} w={40} p={2} rounded={"lg"}>
        <Text
          fontSize={"medium"}
          fontWeight={600}
          color={"white"}
          align={"center"}
        >
          統計情報
        </Text>
      </Box>
      <SimpleGrid
        mt={"4"}
        columns={{ base: 1, md: 2, lg: 4, sm: 1 }}
        spacing={2}
      >
        <BlogPostWithImage
          title={"掲載企業数"}
          num={data.workdatainfo.company_count}
          icon={"/statistics.svg"}
          unit={"社"}
        />
        <BlogPostWithImage
          title={"登録データ数"}
          num={data.workdatainfo.count}
          icon={"/memory.svg"}
          unit={"件"}
        />
        <BlogPostWithImage
          title={"時給の中央値"}
          num={data.workdatainfo.mid}
          icon={"/mouse.svg"}
          unit={"円"}
        />
        <BlogPostWithImage
          title={"時給の平均値"}
          num={data.workdatainfo.avarage}
          icon={"/db.svg"}
          unit={"円"}
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
        {data.company.map((item, index) => {
          return (
            <Link key={index} href={`/workinfo/${item.name}`} passHref>
              <Box
                border={"1px"}
                p={6}
                w={"full"}
                borderColor={"blackAlpha.200"}
                rounded={"lg"}
              >
                <Text fontSize={"xl"} fontWeight={600} mb={4}>
                  {item.name}
                </Text>
                <Badge py={2} mr={1} rounded={"lg"}>
                  max: {item.max}円
                </Badge>
                <Badge py={2} mr={1} rounded={"lg"}>
                  min: {item.min}円
                </Badge>
                <Badge py={2} mr={1} rounded={"lg"}>
                  登録件数: {item.count}
                </Badge>
              </Box>
            </Link>
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
        {data.review.map((item, index) => {
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
      <Box mt={12} mb={6} bg={"blue.400"} w={32} p={2} rounded={"lg"}>
        <Text
          fontSize={"medium"}
          fontWeight={600}
          color={"white"}
          align={"center"}
        >
          企業情報
        </Text>
      </Box>
      <DataTable data={data.workdatainfo.workdata} />
    </>
  );
}

const BlogPostWithImage = (props: {
  title: String;
  num: Number;
  icon: string;
  unit: string;
}) => {
  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      border={"1px"}
      borderColor={"blackAlpha.200"}
      rounded={"sm"}
      overflow={"hidden"}
      display="flex"
      alignItems="center"
      p={2}
    >
      <Image src={props.icon} width={"60"} height={"60"} alt="mouse" />
      <Stack direction={"column"} spacing={0} ml={4}>
        <Text fontSize={"sm"} color={"gray.600"}>
          {props.title}
        </Text>
        <Text fontSize={"xl"} fontWeight={400}>
          {props.num}
          <Text as="span" fontSize={"md"}>
            {props.unit}
          </Text>
        </Text>
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
    <Link href={`/workinfo/${props.name}`} passHref>
      <Center py={6}>
        <Box
          bg={useColorModeValue("white", "gray.900")}
          border={"1px"}
          borderColor={"blackAlpha.200"}
          rounded={"lg"}
          p={3}
          m={1}
          w={"full"}
          h={"full"}
        >
          <Heading fontSize={"xl"} fontFamily={"body"}>
            {props.name}
          </Heading>
          <Text fontWeight={300} color={"gray.500"} mb={4}>
            {props.date}
          </Text>
          <Text>{props.detail}...</Text>
        </Box>
      </Center>
    </Link>
  );
};
