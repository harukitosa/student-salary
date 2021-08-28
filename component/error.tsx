import { Container, Text } from "@chakra-ui/layout"
import Image from "next/image"

export const ErrorPage = () => {
	return (
		<Container h={"100vh"} w="lg">
			<Image
			src="/error.png"
			width={"600"}
			height={"600"}
			alt={"error image"}
			/>
			<Text fontSize={32} fontWeight={"bold"}>
			 Error(Status 500)
			</Text>
			<Text fontSize={18}>
			 解決までお待ちください
			</Text>
		</Container>
	)
}