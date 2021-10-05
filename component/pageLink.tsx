import { Text, Box, HStack, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const SummerInternSpreadSheetLink = () => {
  return (
    <Box w="full">
      <Text fontSize="24" fontWeight="bold">
        夏のインターンスプレッドシート専用UI
      </Text>
      <Text fontSize="16" color="gray.600">
        有志で作成されたインターンシップの情報が集まる魔法のスプレッドシートを見やすくするためのUIを提供しています。
      </Text>
      <Link href="/intern/2021">
        <a>
          <HStack my="4">
            <CheckCircleIcon color="green.400" />
            <Text fontSize="22" color="blue.400" fontWeight="bold">
              2021年
            </Text>
          </HStack>
        </a>
      </Link>
    </Box>
  );
};

export const InternBlogLink = () => {
  return (
    <Box w="full">
      <Text fontSize="24" fontWeight="bold">
        インターン参加ブログまとめサイト
      </Text>
      <Text fontSize="16" color="gray.600">
        エンジニアインターンの参加ブログの記事をまとめています
      </Text>
      <Link href="/blog/all">
        <a>
          <HStack my="4">
            <CheckCircleIcon color="green.400" />
            <Text fontSize="22" color="blue.400" fontWeight="bold">
              ブログ記事を見る
            </Text>
          </HStack>
        </a>
      </Link>
    </Box>
  );
};

interface company {
  name: string;
}

export const CompanyListLink = (props: { companylist: company[] }) => {
  return (
    <Box w="full">
      <Text p="2" fontSize="24" fontWeight="bold">
        登録されている企業一覧
      </Text>
      <SimpleGrid
        mt={"4"}
        columns={{ base: 2, md: 3, lg: 4, sm: 2 }}
        spacing={2}
      >
        {props.companylist.map((item, index) => {
          return (
            <span key={item.name}>
              <Link href={`/workinfo/${item.name}`}>
                <a>
                  <Box bg={"gray.50"} borderRadius="xl" p="2" h="full">
                    <Text
                      fontSize={{ base: 14, md: 18 }}
                      fontWeight="semibold"
                      color="blue.400"
                      px="4"
                    >
                      # {item.name}
                    </Text>
                  </Box>
                </a>
              </Link>
            </span>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
