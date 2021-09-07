import { Text } from "@chakra-ui/layout";
import data from "../../../intern2021.json";

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
  console.log(params);
  let target = {};
  data.forEach((item) => {
    if (item.id === params.id) {
      target = item;
    }
  });
  console.log(target);
  return {
    props: { target },
  };
}

export default function detailPage({ target }) {
  return <h1>hello{JSON.stringify(target)}</h1>;
}
