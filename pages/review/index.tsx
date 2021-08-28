import { useQuery } from "@apollo/client";
import { Text, SimpleGrid } from "@chakra-ui/react";
import { ReviewItem } from "../../component/reviewItem";
import { ErrorPage } from "../../component/error";
import {
  ReviewPageData,
  REVIEW_QUERY,
} from "../../request/queries/reviewpage.query";

export default function ReviewPage() {
  const { loading, error, data } = useQuery<ReviewPageData>(REVIEW_QUERY);
  if (loading) return <p>loading...</p>;
  if (error) return <ErrorPage />;
  return (
    <>
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
    </>
  );
}
