import {
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export const Header = () => {
  return (
    <Box bg="blue.500" w="100%" p={2} color="white">
      <Container maxW="container.xl">
        <Flex>
          <Link href={`/`} passHref>
            <a>
              <Text fontSize="xl" fontWeight="bold">
                StudentSalary
              </Text>
            </a>
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
          <Link href={`/`} passHref>
            <MenuItem>Topページ</MenuItem>
          </Link>
          <Link href={`/workinfo`} passHref>
            <MenuItem>企業一覧</MenuItem>
          </Link>
          <Link href={`/review`} passHref>
            <MenuItem>口コミ一覧</MenuItem>
          </Link>
          <Link href={`/blog/all`} passHref>
            <MenuItem>参加ブログ一覧</MenuItem>
          </Link>
          <Link href={`/calendar`} passHref>
            <MenuItem>新卒採用・インターンカレンダー</MenuItem>
          </Link>
          <Link href={`/new`} passHref>
            <MenuItem>時給登録</MenuItem>
          </Link>
          <Link href={`/review/new`} passHref>
            <MenuItem>口コミ登録</MenuItem>
          </Link>
        </MenuList>
      </Box>
    </Menu>
  );
};
