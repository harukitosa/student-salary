import { Container, Box, Badge } from "@chakra-ui/layout";
import { ErrorPage } from "../../component/error";
import { useRouter } from "next/router";
import { useGetreviewQuery } from "../../src/generated/graphql";

export default function ReviewDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useGetreviewQuery({
    variables: { id: Number(id as string) },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <ErrorPage />;

  const review = data.review[0];
  return (
    <Container maxW="lg">
      <Box
        mt={12}
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box p="6">
          <Box
            mt="1"
            fontWeight="bold"
            fontSize={"32"}
            as="h1"
            lineHeight="tight"
            isTruncated
          >
            {review.company_name}
          </Box>
          <Box
            fontWeight="semibold"
            as="h4"
            color={"gray.500"}
            lineHeight="tight"
            isTruncated
          >
            {review.user_name}
          </Box>

          <LineItem title="内容" content={review.content} />
          <LineItem title="使用した技術" content={review.skill} />
          <LineItem title="参加した理由" content={review.reasons} />
          <LineItem
            title="
	  感想・一推しポイント・詳細など
	  "
            content={review.report}
          />

          <Box mt="8" d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="4" py="2" colorScheme="teal">
              review
            </Badge>
          </Box>
        </Box>
      </Box>
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
