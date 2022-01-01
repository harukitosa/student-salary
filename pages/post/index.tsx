import Head from "next/head";
import { Container, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
// import {Post, HomePageProps} from "../types/type";
import { getAllPostsData } from "../../utils/getPostsData";

export default function Home(props: any) {
  return (
    <div>
      <Head>
        <title>tosalab</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container pt="12" minH={"60vh"}>
          <Text as="h1" fontSize={"32"} fontWeight={"bold"}>スチュサラ速報</Text>
	  <Box my="12">
          <Text fontSize={"28"}># Posts</Text>
          {props.contents.map((item) => {
            return <PostItem {...item} key={"post-key-" + item.data.slug} />;
          })}
	  </Box>
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

function PostItem(props: any) {
  return (
    <Box key={props.data.slug}>
      <Link href={"/post/" + props.data.slug}>
        <a>
          <Container mx="1">
            <Box>
              <Text color="gray.600" fontWeight={"normal"} as="span">
                {props.data.date}
              </Text>
            </Box>
            <Text as="span" fontWeight="bold" _hover={{ color: "#1A0DAB" }}>
              {props.data.title}
            </Text>
            <Text>{props.data.description}</Text>
          </Container>
        </a>
      </Link>
    </Box>
  );
}

export async function getStaticProps() {
  const path = "./posts/";
  const contents = getAllPostsData(path);
  contents.forEach((item) => {
    console.log(item.data.slug);
  });
  const tagSet = contents.reduce((acc: Set<string>, val) => {
    if (val.data.tags != null) {
      const tags = val.data.tags as string[];
      tags.forEach((item) => acc.add(item));
    }
    return acc;
  }, new Set<string>());
  const tags = Array.from(tagSet);
  return {
    props: {
      contents,
      tags,
    },
  };
}
