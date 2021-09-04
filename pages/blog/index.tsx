import data from "../../blog.json";
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
  Container,
  Flex,
  Spacer,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/dist/client/image";
export default function BlogPage() {
  return (
    <>
    <Center h="52" bg="blackAlpha.100" my="4" borderRadius="2xl">
	<Text as="h1" fontSize="4xl" fontWeight="800">blogまとめ</Text>
    </Center>
      {data.map((item, index) => {
        return <ItemBlock key={index} item={item} />;
      })}
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
    <HStack align={"center"} my="2" mx="1" p="1" h="32">
      <Box color={"black"} p="6" borderRadius="xl" mx="2">
        <LinkIcon w="6" h="6"/>
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
