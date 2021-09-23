import { Text, SimpleGrid, Box } from "@chakra-ui/react";
import { ReviewItem } from "../../component/reviewItem";
import { ErrorPage } from "../../component/error";
import { useReviewQuery } from "../../src/generated/graphql";
import { Loading } from "../../component/loading";

export default function ReviewPage() {
  const { loading, error, data } = useReviewQuery();
  if (loading) return <Loading/>;
  if (error) return <ErrorPage />;
  return (
    <Box minH="100vh">
      <Text p={"8"} fontSize={"32"} fontWeight={"semibold"}>
        口コミ一覧
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }}>
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
  );
}
