import {
  Text,
  Box,
  Flex,
  SimpleGrid,
  GridItem,
  Grid,
  Divider,
} from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import data from "../../../intern2021.json";
import Link from "next/link";

export async function getStaticPaths() {
  let paths = [];
  data.forEach((item: any) => {
    paths.push({ params: { id: item.id } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let target = {};
  data.forEach((item) => {
    if (item.id === params.id) {
      target = item;
    }
  });
  return {
    props: { target },
  };
}

export default function detailPage({ target }) {
  return (
    <Box>
      <Breadcrumb
        spacing="8px"
        fontSize="18"
        my="4"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link href={"/intern/2021"}>
            <a>2021年夏</a>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text>{target.company_name}</Text>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box mt="8" mb="12">
        <Text
          as={"span"}
          position={"relative"}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          _after={{
            content: "''",
            width: "full",
            position: "absolute",
            bottom: 1,
            left: 0,
            bg: "blue.400",
            height: "10%",
            zIndex: -1,
          }}
        >
          {target.company_name}
        </Text>
      </Box>

      <Item title="内容" content={target.content} />
      <Item title="応募期限" content={target.limit} />
      <Item title="対象" content={target.target} />
      <Item title="求めるスキル" content={target.skill} />
      <Item title="給料" content={target.salary} />
      <Item title="期間" content={target.span} />
      <Item title="交通費" content={target.transportationexpenses} />
      <Item title="ホテル" content={target.hotel} />
      <Item title="応募先" content={target.url} />
    </Box>
  );
}

const Item = (props: { title: string; content?: string }) => {
  return (
    <>
      <Divider />
      <SimpleGrid
        py="4"
        // columns={{ base: 1, md: 2, lg: 2, sm: 1 }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        spacing={2}
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontSize="18" fontWeight="bold">
            {props.title}
          </Text>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }} maxW="100vw">
          <Box>
            <Text>
          {props.content === undefined || props.content == ""
            ? "記載なし"
            : props.content}
            </Text>
            </Box>
        </GridItem>
      </SimpleGrid>
    </>
  );
};
