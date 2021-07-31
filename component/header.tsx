import { Box, Container, Text, Menu, MenuButton, MenuItem, MenuList, Flex, Spacer } from "@chakra-ui/react"

export const Header = () => {
	return (
		<Box bg="blue.500" w="100%" p={4} color="white">
			<Container maxW="container.xl">
				<Flex>
				<Text fontSize="2xl" fontWeight="bold">StudentSalary</Text>
				<Spacer />
				<HeaderMenu/>
				</Flex>
			</Container>
		</Box>
	)
}

const HeaderMenu = () => {
	return (
		<Menu>
		<MenuButton>
		Menu
		</MenuButton>
		<Box color="black">
		<MenuList>
			<MenuItem>Download</MenuItem>
			<MenuItem>Create a Copy</MenuItem>
			<MenuItem>Mark as Draft</MenuItem>
			<MenuItem>Delete</MenuItem>
			<MenuItem>Attend a Workshop</MenuItem>
		</MenuList>
		</Box>
		</Menu>
	)
}