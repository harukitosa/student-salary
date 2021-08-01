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
  ThemeTypings
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { title } from "process";
import { ReactNode } from "react";
import { CheckIcon } from "@chakra-ui/icons";

export default function Home() {
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
      <SimpleGrid columns={{base: 4, md: 2, lg: 4, sm: 1}} spacing={2}>
      <BlogPostWithImage title={"掲載企業数"} num={"2000"} color={"green.400"}/>
      <BlogPostWithImage title={"掲載企業数"} num={"2000"} color={"blue.400"}/>
      <BlogPostWithImage title={"掲載企業数"} num={"2000"} color={"orange.400"}/>
      <BlogPostWithImage title={"掲載企業数"} num={"2000"} color={"pink.400"}/>
      </SimpleGrid>
    </Container>
  );
}

const BlogPostWithImage = (props: { title: String; num: String, color: ThemeTypings["colorSchemes"]|(string & {})}) => {
  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={props.color}
            p={2}
            px={3}
            color={"white"}
            rounded={"full"}
          >
            {props.title}
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"4xl"} fontWeight={800}>
              {props.num}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
