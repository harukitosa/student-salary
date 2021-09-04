import data from "../../blog.json";
import {
  Text,
  Center,
  Box,
  HStack,
  VStack,
  Container,
  Select
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/dist/client/image";
import { useForm, Controller, ChangeHandler } from "react-hook-form";
import React, { useState } from 'react';


interface IFormInput {
	company_name: string;
}
export default function BlogPage() {
  const [company_name, setName] = useState("all");
  const set = new Set<String>();
  data.forEach(item => set.add(item.company_name));
  return (
    <>
    <Container minH="100vh"
    <Center h="52" bg="blackAlpha.100" my="4" borderRadius="2xl">
        <Text as="h1" fontSize="4xl" fontWeight="800">
          blogまとめ
        </Text>
      </Center>
            <Select onChange={(e) => {setName(e.target.value)}}>
		<option>all</option>
              {Array.from(set).map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
      {data.filter(item => {
	      if (company_name==="all") {
		      return true;
	      }
	      return item.company_name === company_name;
      }).map((item, index) => {
        return <ItemBlock key={index} item={item} />;
      })}
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
const ItemBlock = (props: { item: blog }) => {
  return (
    <Link href={props.item.url} passHref>
      <HStack align={"center"} my="2" mx="1" p="1" h="28">
        <Box color={"black"} p="6" borderRadius="xl" mx="2">
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
