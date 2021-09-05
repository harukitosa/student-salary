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

export default function BlogPage() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <>
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
    border = "0px";
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
    <Link href={props.item.url} passHref>
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
    </Link>
  );
};
