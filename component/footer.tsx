import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";

const ListHeader = ({ children }: { children: any }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export const Footer = () => {
  return (
    <>
      <Box
        mt="24"
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={"flex-start"}>
              <ListHeader>StudentSalary</ListHeader>
              <Link href={"/"}>
                <a>ホーム</a>
              </Link>
              <Link href={"/workinfo"}>
                <a>企業一覧</a>
              </Link>
              <Link href={"/blog/all"}>
                <a href="">ブログまとめ</a>
              </Link>
              <Link href={"/review"}>
                <a href="">口コミ一覧</a>
              </Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Contribute</ListHeader>
              <Link href={"/new"}>
                <a>時給登録</a>
              </Link>
              <Link href={"/review/new"}>
                <a>口コミ登録</a>
              </Link>
              <Link
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLSfuEid3qlioZLBR3-QjGh7fmNUvtcesd6EYpX5uxOh22h3--Q/viewform"
                }
              >
                <a>ブログ登録</a>
              </Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Contact</ListHeader>
              <Link href={"https://twitter.com/tosa_now"}>開発者twitter</Link>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};
