import data from "../../blog.json";
import {
  Text,
  Center,
  Box,
  HStack,
  VStack,
  Container,
  Select,
  Wrap,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useGetBlogQuery } from "../../src/generated/graphql";
import { ErrorPage } from "../../component/error";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

export default function BlogPage() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={`${name}のインターン参加ブログまとめ`}
        />
        <meta
          property="og:description"
          content="学生エンジニアの情報共有サイト"
        />
        <meta
          name="twitter:description"
          content="学生エンジニアの情報共有サイト"
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dam6j1bfo/image/upload/l_text:Sawarabi%20Gothic_65_bold:${name}のインターン参加ブログまとめ,co_rgb:333,w_800,c_fit/v1630839169/StudentOGP_pkno2h.jpg`}
        />
      </Head>
      <Container minH="100vh">
        <Center h="52" bg="blackAlpha.100" my="4" borderRadius="2xl">
          <Text as="h1" fontSize="xl" fontWeight="600">
            <Text as="span" fontSize="2xl" fontWeight="800">
              {name}
            </Text>
            <br />
            インターン参加blogまとめ
          </Text>
        </Center>
        <BlogView />
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

const BlogView = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data, loading, error } = useGetBlogQuery({
    variables: { company_name: name as string },
  });
  if (loading) return <p>loading...</p>;
  if (error) {
    console.log(error);
    return <ErrorPage />;
  }

  return (
    <>
      <Wrap>
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
      </Wrap>
      <Box py="4"></Box>
      {data.blog.blog.map((item, index) => {
        return <ItemBlock key={index} item={item} />;
      })}
    </>
  );
};

const LinkBox = (props: { title: string; url: string; select?: boolean }) => {
  let border = "1px";
  let bg = "white";
  let color = "black";
  if (props.select != undefined && props.select) {
    bg = "blue.400";
    border = "1px";
    color = "white";
  }
  return (
    <Link href={props.url} passHref>
      <Box
        py="1"
        px="3"
        border={border}
        color={color}
        borderColor={`gray.300`}
        bg={bg}
        borderRadius="lg"
      >
        {props.title}
      </Box>
    </Link>
  );
};

const ItemBlock = (props: { item: blog }) => {
  return (
    <a target="_blank" href={props.item.url} rel="noopener noreferrer">
      <HStack align={"center"} my="1" h="32">
        <Box color={"black"} p="6" borderRadius="xl">
          <LinkIcon w="6" h="6" />
        </Box>
        <VStack align={"start"}>
          <Text fontWeight={600}>{props.item.title}</Text>
          <Text color={"gray.600"}>
            {props.item.company_name} - {props.item.year} - {props.item.season}
          </Text>
        </VStack>
      </HStack>
    </a>
  );
};
