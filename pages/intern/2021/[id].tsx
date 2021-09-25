import { Text, Box, Container } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import data from "../../../intern2021.json";
import Link from "next/link";
import {
  InternItem as Item,
  InternItemContent as Content,
  InternItemTitle as Title,
  InternItemUrl as Url,
} from "../../../component/InternItem";

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
    <Container minW="80vw">
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

      <Item>
        <Title title="内容" />
        <Content content={target.content} />
      </Item>
      <Item>
        <Title title="応募期限" />
        <Content content={target.limit} />
      </Item>
      <Item>
        <Title title="対象" />
        <Content content={target.target} />
      </Item>
      <Item>
        <Title title="求めるスキル" />
        <Content content={target.skill} />
      </Item>
      <Item>
        <Title title="給料" />
        <Content content={target.salary} />
      </Item>
      <Item>
        <Title title="期間" />
        <Content content={target.span} />
      </Item>
      <Item>
        <Title title="交通費" />
        <Content content={target.transportationexpenses} />
      </Item>
      <Item>
        <Title title="ホテル" />
        <Content content={target.hogel} />
      </Item>
      <Item>
        <Title title="応募先" />
        <Url url={target.url} />
      </Item>
    </Container>
  );
}
