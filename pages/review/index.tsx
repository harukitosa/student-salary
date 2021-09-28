import { Text, SimpleGrid, Box } from "@chakra-ui/react";
import { ReviewItem } from "../../component/reviewItem";
import { ErrorPage } from "../../component/error";
import { useReviewQuery } from "../../src/generated/graphql";
import { Loading } from "../../component/loading";
import { SEO } from "../../component/seo";
import router from "next/router";

export default function ReviewPage() {
  const { loading, error, data } = useReviewQuery();
  if (loading) return <Loading />;
  if (error) return <ErrorPage />;
  return (
    <>
      <SEO
        title="エンジニアインターンシップの口コミ一覧"
        description="エンジニアインターンシップの口コミを掲載しています。"
        url={"https://www.student-salary.com/" + router.asPath}
        imageText="インターンシップの口コミ一覧"
      />
      <Box pt="24">
        <Text p={"8"} fontSize={"32"} fontWeight={"semibold"}>
          口コミ一覧
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} mx="4">
          {data.review.map((item, index) => {
            return (
              <ReviewItem
                key={index}
                link={`/review/${item.id}`}
                name={item.company_name}
                user_name={item.user_name}
                detail={item.report.substr(0, 20)}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}
