import {
	Text,
	Center,
	Stack,
	Heading,
	Button,
	Box,
	useColorModeValue,
	SimpleGrid,
	HStack,
	VStack,
	Spacer,
} from "@chakra-ui/react";
import Link from "next/link"
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
	)
}

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
	)
}