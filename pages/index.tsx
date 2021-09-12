import {
  Text,
  Center,
  Stack,
  Heading,
  Button,
  Box,
  useColorModeValue,
  SimpleGrid,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { DataTable } from "../component/simpletable";
import Link from "next/link";
import Image from "next/image";
import { ErrorPage } from "../component/error";
import { ReviewItem } from "../component/reviewItem";
import Head from "next/head";
import { useGetHomePageQuery } from "../src/generated/graphql";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const HeadInformation = () => {
  return (
    <Head>
      <title>StudentSalary 学生エンジニアの情報共有サイト</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tosa_now" />
      <meta name="twitter:title" content="StudentSalary" />
      <meta
        name="twitter:description"
        content="学生エンジニアの情報共有サイト"
      />
      <meta
        name="twitter:image"
        content="https://www.student-salary.com/StudentOGP.jpeg"
      />
      <meta property="og:title" content="StudentSalary" />
      <meta
        property="og:description"
        content="学生エンジニアの情報共有サイト"
      />
      <meta property="og:site_name" content="StudentSalary" />
      <meta
        property="og:image"
        content="https://www.student-salary.com/StudentOGP.jpeg"
      />
    </Head>
  );
};

export default function Home() {
  return (
    <>
      <HeadInformation />
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
      <HomePage />
    </>
  );
}

function HomePage() {
  const { data, loading, error } = useGetHomePageQuery({});
  if (loading) return <p>loading...</p>;
  if (error) {
    console.log(error);
    return <ErrorPage />;
  }

  return (
    <>
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
            <Link key={index} href={`/workinfo/${item.name}`}>
              <a>
                <Box
                  border={"1px"}
                  w={"full"}
                  borderColor={"blackAlpha.200"}
                  p={"5"}
                  flex="1"
                >
                  <HStack>
                    <VStack align="left">
                      <Text
                        fontSize={"18"}
                        fontWeight={"bold"}
                        color={"blue.400"}
                      >
                        {item.name}
                      </Text>
                      <Text fontSize={"14"} fontWeight={"bold"}>
                        {item.min}円/hr ~ {item.max}円/hr
                      </Text>
                    </VStack>
                    <Spacer />
                    <VStack>
                      <Text fontSize="24">
                        {item.count}
                        <Text fontSize="14" as="span">
                          件
                        </Text>
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </a>
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
            <ReviewItem
              key={item.id}
              link={`/review/${item.id}`}
              name={item.company_name}
              user_name={item.user_name}
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
      <Center alignContent={"center"} py={16}>
        <Link href={`/workinfo`} passHref>
          <Button
            color={"blue.400"}
            border={"1px"}
            rounded={"full"}
            bg={"white"}
            px={2}
            py={6}
            width={"80"}
            _hover={{
              bg: "blue.400",
              color: "white",
            }}
          >
            企業一覧
          </Button>
        </Link>
      </Center>
      <Box w="full">
        <Text p="2" fontSize="24" fontWeight="bold">
          登録されている企業一覧
        </Text>
        <SimpleGrid
          mt={"4"}
          columns={{ base: 2, md: 3, lg: 4, sm: 2 }}
          spacing={2}
        >
          {data.companylist.map((item, index) => {
            return (
              <span key={item.name}>
                <Link href={`/workinfo/${item.name}`}>
                  <a>
                    <Box bg={"gray.50"} borderRadius="xl" p="4" h="full">
                      <Text
                        fontSize={{ base: 14, md: 18 }}
                        fontWeight="semibold"
                        color="blue.400"
                        px="2"
                      >
                        {item.name}
                      </Text>
                    </Box>
                  </a>
                </Link>
              </span>
            );
          })}
        </SimpleGrid>
      </Box>

      {/* 夏のインターンスプレッドシート専用UI */}
      <Box w="full" mt="24">
        <Text fontSize="24" fontWeight="bold">
          夏のインターンスプレッドシート専用UI
        </Text>
        <Text fontSize="16" color="gray.600">
          有志で作成されたインターンシップの情報が集まる魔法のスプレッドシートを見やすくするためのUIを提供しています。
        </Text>
        <Link href="/intern/2021">
          <a>
            <HStack my="4">
              <CheckCircleIcon color="green.400" />
              <Text fontSize="22" color="blue.400" fontWeight="bold">
                2021年
              </Text>
            </HStack>
          </a>
        </Link>
      </Box>
    </>
  );
}

export const BlogPostWithImage = (props: {
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
