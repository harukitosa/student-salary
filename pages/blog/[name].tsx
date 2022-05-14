import { Text, Center, Box, HStack, VStack, Flex } from "@chakra-ui/react";
import React from "react";
import { GetBlogQuery } from "../../src/generated/graphql";
import { ContributeButton } from "../../component/contributeButton";
import { useRouter } from "next/router";
import { ShareButton } from "../../component/shareButton";
import { SEO } from "../../component/seo";
import Link from "next/link";

export async function getStaticPaths() {
  const results = await fetch(
    "https://student-salary-api.an.r.appspot.com/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query{
        blog(company_name: "all") {
          nameList
        }
      }`,
      }),
    }
  );
  const json = await results.json();
  const paths = json.data.blog.nameList.map((item) => ({
    params: { name: item },
  }));
  paths.push({ params: { name: "all" } });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const company_name = params.name;
  const results = await fetch(
    "https://student-salary-api.an.r.appspot.com/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query{
        blog(company_name: "${company_name}") {
          blog {
            title
            company_name
            url
            season
            year
          }
          nameList
        }
      }`,
      }),
    }
  );
  const data = await results.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, company_name }, // will be passed to the page component as props
  };
}

export default function BlogPage({ data, company_name }) {
  return (
    <>
      <SEO
        title={`${
          company_name == "all" ? "エンジニア" : company_name
        }のインターン参加ブログまとめ`}
        description={`${
          company_name == "all" ? "エンジニア" : company_name
        }のインターンブログをまとめて掲載しています。`}
        imageText={`${
          company_name == "all" ? "エンジニア" : company_name
        }のインターン参加ブログまとめ`}
      />
      <Box
        maxW={{ base: "100vw", md: "70vw" }}
        margin="auto"
        px={{ base: "2", md: "12" }}
      >
        <Box pt="12" mb="2">
          <Text as="h1" fontSize={{ base: "4xl" }} fontWeight="600">
            {company_name == "all" ? "エンジニア" : company_name}
            インターンブログまとめ。
          </Text>
        </Box>
        <Text fontSize="18">
          {company_name}
          の開発インターンに参加した学生のブログのリンクを掲載しています。
          <br />
          リンクをクリックすると外部サイトに飛びます。
        </Text>
        <BlogView data={data.data} name={company_name} />
      </Box>
    </>
  );
}

interface blog {
  title: string;
  company_name: string;
  year: string;
  season: string;
  url: string;
}

const BlogView = (props: { data: GetBlogQuery; name: string }) => {
  const data = props.data;
  const name = props.name;
  const router = useRouter();
  const page = parseInt(router.query.page as string, 10) || 0;
  const maxPageCount = 40;
  // const maxBlogSize = data.blog.blog.length;
  const pageCount = parseInt(data.blog.blog.length / maxPageCount);

  return (
    <>
      <Box py="4"></Box>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "76%" }}>
          {data.blog.blog
            .slice(page * maxPageCount, page * maxPageCount + maxPageCount)
            .map((item, index) => {
              return <BlogItemBlock key={index} item={item} />;
            })}
        </Box>
        <Flex
          mt="4"
          w={{ base: "100%", md: "24%" }}
          direction="column"
          pl="4"
          borderLeft={"1px"}
          borderColor="gray.200"
        >
          <LinkBox title="all" url={`/blog/all`} />
          {data.blog.nameList.map((item) => {
            return (
              <LinkBox
                key={item}
                title={item}
                url={`/blog/${item}`}
                select={item == name}
              />
            );
          })}
        </Flex>
      </Flex>

      <VStack>
        <Box fontSize={22}>Page</Box>
        <Flex gap={"4"}>
          {[...Array(pageCount)].map((item, index) => {
            return (
              <Center key={index}>
                <Link href={`/blog/${props.name}?page=${index}`}>
                  <a>
                    <Text
                      fontSize={28}
                      color={page == index ? "gray.200" : "blue.600"}
                    >
                      {index}
                    </Text>
                  </a>
                </Link>
              </Center>
            );
          })}
        </Flex>
      </VStack>

      <Text pt="12" fontSize="18" fontWeight="bold" align="center">
        Blog情報の提供はこちらからお願いします
      </Text>
      <Center py="8">
        <ContributeButton link={"https://forms.gle/dNwsVNqqq4MCsY6q6"} />
      </Center>

      <ShareButton
        url={"https://www.student-salary.com" + router.asPath}
        title={`${name}のインターン参加ブログまとめ`}
      />
    </>
  );
};

const LinkBox = (props: { title: string; url: string; select?: boolean }) => {
  let color = "blue.600";
  if (props.select != undefined && props.select) {
    color = "red.200";
  }
  return (
    <Link href={props.url}>
      <a>
        <Text fontSize={22} color={color}>
          {props.title}
        </Text>
      </a>
    </Link>
  );
};

export const BlogItemBlock = (props: { item: blog }) => {
  return (
    <HStack
      align={"center"}
      my="2"
      px="4"
      borderLeft="4px"
      borderColor="blue.400"
    >
      <VStack align={"start"}>
        <a href={props.item.url} target="_blank" rel="noopener noreferrer">
          <Text color="blue.600" fontWeight={400} fontSize={22}>
            {props.item.title}
          </Text>
        </a>
        <Text fontSize="18" color={"gray.600"} as="span">
          {props.item.company_name} - {props.item.year} - {props.item.season}
        </Text>
      </VStack>
    </HStack>
  );
};
