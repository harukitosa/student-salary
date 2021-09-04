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
import Link from "next/link";
import Image from "next/dist/client/image";
export default function BlogPage() {
  return (
    <>
      <Text as="h1">blog</Text>
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
		<HStack align={'center'} my="2" py="1">
		<Box color={'green.400'} px={2}>
	            <Image src="/node.svg" layout="fixed" height={30} width={30} alt="link icon" />
		</Box>
		<VStack align={'start'}>
		  <Text fontWeight={600}>{props.item.title}</Text>
		  <Text color={'gray.600'}>{props.item.company_name} - {props.item.year} - {props.item.season}</Text>
		</VStack>
	      </HStack>
	)
};
