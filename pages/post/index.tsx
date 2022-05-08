import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { SEO } from "../../component/seo";
// import {Post, HomePageProps} from "../types/type";
import { getAllPostsData } from "../../utils/getPostsData";

export default function Home(props: any) {
  return (
    <div>
      <SEO
        title={`スチュサラ速報`}
        description={`エンジニアインターンやアルバイト情報をまとめています`}
        imageText={`スチュサラ速報`}
      />

      <main>
        <Box maxW="100vw" margin="auto" px={{ base: "2", md: "12" }}>
          <Box pt="12" mb="2">
            <Text as="h1" fontSize={{ base: "4xl" }} fontWeight="600">
              スチュサラ速報
            </Text>
          </Box>
          <Text fontSize="18">
            エンジニアインターンやアルバイト情報の記事をまとめています。
          </Text>
          {props.contents.map((item) => {
            return <PostItem {...item} key={"post-key-" + item.data.slug} />;
          })}
        </Box>
      </main>
      <footer></footer>
    </div>
  );
}

function PostItem(props: any) {
  return (
    <>
      <Box py="4"></Box>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "76%" }}>
          <HStack
            align={"center"}
            my="2"
            px="4"
            borderLeft="4px"
            borderColor="blue.400"
          >
            <VStack align={"start"}>
              <a
                href={"/post/" + props.data.slug}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text color="blue.600" fontWeight={400} fontSize={22}>
                  {props.data.title}
                </Text>
              </a>
              <Text fontSize={"18"}>{props.data.description}</Text>
              <Text fontSize="18" color={"gray.600"} as="span">
                {props.data.date}
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Flex
          mt="4"
          w={{ base: "100%", md: "24%" }}
          direction="column"
          pl="4"
          borderLeft={"1px"}
          borderColor="gray.200"
        >
          {/* ここにTag等一覧を作成する */}
        </Flex>
      </Flex>
    </>
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
