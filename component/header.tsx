import {
  Box,
  Container,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

export const Header = () => {
  return (
    <Box bg="blue.500" w="100%" p={2} color="white">
      <Container maxW="container.xl">
        <Flex>
          <Link href={`/`}>
            <Text fontSize="xl" fontWeight="bold">
              StudentSalary
            </Text>
          </Link>
          <Spacer />
          <HeaderMenu />
        </Flex>
      </Container>
    </Box>
  );
};

const HeaderMenu = () => {
  return (
    <Menu>
      <MenuButton>Menu</MenuButton>
      <Box color="black">
        <MenuList>
          <Link href={`/`}>
            <MenuItem>Topページ</MenuItem>
          </Link>
          <Link href={`/workinfo`}>
            <MenuItem>企業一覧</MenuItem>
          </Link>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
