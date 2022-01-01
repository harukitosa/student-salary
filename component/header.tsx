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
  Center,
} from "@chakra-ui/react";
import Link from "next/link";

export const Header = () => {
  return (
    <Box
      bg="blue.500"
      w="100%"
      color="white"
      as="header"
      position="fixed"
      zIndex="999"
      h="12"
    >
      <Container maxW="container.xl">
        <Flex as="nav">
          <Box my="2">
            <Link href={`/`}>
              <a>
                <Text fontSize="xl" fontWeight="bold">
                  StudentSalary
                </Text>
              </a>
            </Link>
          </Box>
          <Spacer />
          <Box display={{ base: "none", md: "flex" }}>
            <HeaderItem href="/" content="Home" />
            <HeaderItem href="/workinfo" content="企業一覧" />
            <HeaderItem href="/review" content="口コミ" />
            <HeaderItem href="/blog/all" content="参加ブログ一覧" />
            <HeaderItem href="/post" content="速報" />
            <HeaderItem href="/new" content="時給登録" />
            <HeaderItem href="/review/new" content="口コミ登録" />
          </Box>

          <Box display={{ base: "flex", md: "none" }}>
            <HeaderMenu />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const HeaderItem = (props: { href: string; content: string }) => {
  return (
    <Link href={props.href}>
      <a>
        <Box
          _hover={{
            background: "white",
            color: "blue.600",
          }}
          px="4"
          h="12"
          textAlign="center"
        >
          <Center h="12">{props.content}</Center>
        </Box>
      </a>
    </Link>
  );
};

const HeaderMenu = () => {
  return (
    <Menu>
      <MenuButton>Menu</MenuButton>
      <Box color="black">
        <MenuList>
          <Link href={`/`}>
            <a>
              <MenuItem>Topページ</MenuItem>
            </a>
          </Link>
          <Link href={`/workinfo`}>
            <a>
              <MenuItem>企業一覧</MenuItem>
            </a>
          </Link>
          <Link href={`/review`}>
            <a>
              <MenuItem>口コミ一覧</MenuItem>
            </a>
          </Link>
          <Link href={`/blog/all`}>
            <a>
              <MenuItem>参加ブログ一覧</MenuItem>
            </a>
          </Link>
          <Link href={`/post`}>
            <a>
              <MenuItem>スチュサラ速報</MenuItem>
            </a>
          </Link>
          <Link href={`/new`}>
            <a>
              <MenuItem>時給登録</MenuItem>
            </a>
          </Link>
          <Link href={`/review/new`} passHref>
            <a>
              <MenuItem>口コミ登録</MenuItem>
            </a>
          </Link>
        </MenuList>
      </Box>
    </Menu>
  );
};
