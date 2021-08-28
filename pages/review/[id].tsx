import { Container, Text, Box } from "@chakra-ui/layout"
import { ReviewBYIDPageData, REVIEWBYID_QUERY } from "../../request/queries/reviewpage.query";
import { useQuery } from "@apollo/client";
import { ErrorPage } from "../../component/error";
import { useRouter } from "next/router";

export default function ReviewDetailPage() {
	const router = useRouter()
	const { id } = router.query
	const { loading, error, data } = useQuery<ReviewBYIDPageData>(REVIEWBYID_QUERY, {
		variables: {
			id
		}
	});
	if (loading) return <p>loading...</p>;
	if (error) return <p>{JSON.stringify(error)}</p>;
	return (
		<Container w="lg">
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
         beds &bull; } baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
		title
        </Box>

        <Box>
		Tokyo
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>
      </Box>
    </Box>
			{JSON.stringify(data)}
		</Container>
	)
}

