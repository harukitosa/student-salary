import {
  Text,
  Center,
  Box,
  HStack,
  VStack,
  Container,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { GetBlogQuery } from "../../src/generated/graphql";
import { ContributeButton } from "../../component/contributeButton";
import { useRouter } from "next/router";
import { ShareButton } from "../../component/shareButton";
import { SEO } from "../../component/seo";
import { LinkBlock } from "../../component/LInkBlock";

export async function getStaticPaths() {
  let results = await fetch(
    "https://student-salary-api.an.r.appspot.com/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query{
        blog {
          nameList
        }
      }`,
      }),
    }
  );
  let paths = [];
  const json = await results.json();
  json.data.blog.nameList.forEach((item: string) => {
    paths.push({ params: { name: item } });
  });
  paths.push({ params: { name: "all" } });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const company_name = params.name;
  let results = await fetch(
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
        title={`StudentSalary ${company_name}のインターン参加ブログまとめ`}
        description={`${company_name}のインターン参加ブログをまとめて掲載しています。`}
        imageText={`${company_name}のインターン参加ブログまとめ`}
      />
      <Container>
        <Box borderBottom="1px" borderColor="gray.400" mt="12" mb="2">
          <Text as="h1" fontSize="3xl" fontWeight="600">
            {company_name}
            <br />
            <Text fontSize="xl" fontWeight="500">
              インターン参加blogまとめ
            </Text>
          </Text>
        </Box>
        <BlogView data={data.data} name={company_name} />
      </Container>
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

  return (
    <>
      <Wrap>
        <LinkBox title="all" url={`/blog/all`} />
        {data.blog.nameList.map((item) => {
          return (
            <>
              <LinkBox
                key={item}
                title={item}
                url={`/blog/${item}`}
                select={item == name}
              />
            </>
          );
        })}
      </Wrap>
      <Box py="4"></Box>
      {data.blog.blog.map((item, index) => {
        return <BlogItemBlock key={index} item={item} />;
      })}

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
  let border = "1px";
  let bg = "white";
  let color = "blue.400";
  if (props.select != undefined && props.select) {
    bg = "white";
    border = "1px";
    color = "black";
  }
  return (
    <LinkBlock url={props.url}>
      <Text color={color}>{props.title}</Text>
    </LinkBlock>
  );
};

export const BlogItemBlock = (props: { item: blog }) => {
  return (
    <HStack align={"center"} py="2" borderBottom="1px" borderColor="gray.400">
      <VStack align={"start"}>
        <LinkBlock url={props.item.url} is_external={true}>
          <Text color="blue.600" fontWeight={400}>
            {props.item.title}
          </Text>
        </LinkBlock>
        <Text fontSize="14" color={"gray.600"} as="span">
          {props.item.company_name} - {props.item.year} - {props.item.season}
        </Text>
      </VStack>
    </HStack>
  );
};
