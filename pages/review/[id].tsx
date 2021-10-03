import { Box, Badge, Text, Container } from "@chakra-ui/layout";
import { ErrorPage } from "../../component/error";
import { useRouter } from "next/router";
import { useGetreviewQuery } from "../../src/generated/graphql";
import {
  InternItem as Item,
  InternItemContent as Content,
  InternItemTitle as Title,
} from "../../component/InternItem";
import { Loading } from "../../component/loading";

export default function ReviewDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useGetreviewQuery({
    variables: { id: Number(id as string) },
  });
  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const review = data.review[0];
  return (
    <Container minH="90vh" minW="80vw">
      <Box mb="12">
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
          {review.company_name}
        </Text>
      </Box>
      <Item>
        <Title title="username" />
        <Content content={review.user_name} />
      </Item>
      <Item>
        <Title title="内容" />
        <Content content={review.content} />
      </Item>
      <Item>
        <Title title="応募した理由" />
        <Content content={review.reasons} />
      </Item>
      <Item>
        <Title title="感想・一推しポイント・詳細など" />
        <Content content={review.report} />
      </Item>
      <Item>
        <Title title="使用した技術" />
        <Content content={review.skill} />
      </Item>
    </Container>
  );
}

const LineItem = (props: { title: string; content: String }) => {
  return (
    <>
      <Badge borderRadius="md" px="2" py="1" mt="4" bg="blue.200">
        {props.title}
      </Badge>
      <Box
        mt="2"
        fontWeight="semibold"
        as="p"
        fontSize={"16"}
        lineHeight="tight"
      >
        {props.content}
      </Box>
    </>
  );
};
