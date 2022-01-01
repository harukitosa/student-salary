import matter from "gray-matter";
import { renderMarkdown } from "../../utils/renderMarkdown";
import fs from "fs";
import { GetStaticPropsContext } from "next";
import { Container, Box, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function PostPage(props) {
  return (
    <div>
      <main>
        <PostView {...props} />
      </main>

      <footer>
        <Container height="32">
          <Link href="/">Topページに戻る</Link>
        </Container>
      </footer>
    </div>
  );
}

function PostView(props: any) {
  return (
    <Box w="100vw">
      <Container padding="4">
        <Heading as="h2" size="2xl" py="12">
          {props.data.title}
        </Heading>
        <Box pt="12">
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </Box>
      </Container>
    </Box>
  );
}

const baseName = (str: string) => {
  const base = new String(str).substring(str.lastIndexOf("/") + 1);
  if (base.lastIndexOf(".") != -1)
    return base.substring(0, base.lastIndexOf("."));
  return base;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  if (context.params == null || typeof context.params.id !== "string") return;
  const path = "./posts/";
  const file = fs.readFileSync(path + context.params.id + ".md", "utf-8");
  const content = matter(file);
  const post = renderMarkdown(content.content);
  const blogData = {
    ...content,
    content: post,
    orig: "",
  };
  return {
    props: blogData,
  };
}

export async function getStaticPaths() {
  const path = "./posts/";
  const files = fs.readdirSync(path);
  const paths = files
    .map((fileName) => {
      return { params: { id: baseName(fileName) } };
    })
    .filter((v) => v);
  console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
}
