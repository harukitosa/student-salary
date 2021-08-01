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
  ThemeTypings,
  Avatar,
  Badge,
  Link
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
      <SimpleGrid columns={{ base: 4, md: 2, lg: 4, sm: 1 }} spacing={2}>
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"green.400"}
        />
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"blue.400"}
        />
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"orange.400"}
        />
        <BlogPostWithImage
          title={"掲載企業数"}
          num={"2000"}
          color={"pink.400"}
        />
      </SimpleGrid>
      <SimpleGrid columns={{base: 1, md: 3}}>
      <SocialProfileSimple name="LINE" date={"2021-03-12"}/>
      <SocialProfileSimple name="LINE" date={"2021-03-12"}/>
      <SocialProfileSimple name="LINE" date={"2021-03-12"}/>
        </SimpleGrid>
    </Container>
  );
}

const BlogPostWithImage = (props: {
  title: String;
  num: String;
  color: ThemeTypings["colorSchemes"] | (string & {});
}) => {
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
            <Text fontSize={"3xl"} fontWeight={800}>
              {props.num}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

function SocialProfileSimple(props: {name: String, date: String}) {
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {props.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {props.date}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          Java+オンプレの会社で内製のライブラリも多く、企業としての大きさを感じました。
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={0}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #Java
          </Badge>
        </Stack>
      </Box>
    </Center>
  );
}