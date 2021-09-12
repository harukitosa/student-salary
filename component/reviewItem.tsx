import {
  Text,
  Center,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import Link from "next/link";
export const ReviewItem = (props: {
  name: String;
  detail: String;
  user_name: String;
  link: String;
}) => {
  return (
    <Link href={`${props.link}`}>
      <a>
        <Center py={4}>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            border={"1px"}
            borderColor={"blackAlpha.200"}
            p={3}
            m={1}
            w={"full"}
            h={"full"}
          >
            <Heading fontSize={"xl"} fontFamily={"body"} color="blue.400">
              {props.name}
            </Heading>
            <Text fontSize={"12"} fontWeight={300} color={"gray.500"} mb={4}>
              {props.user_name}
            </Text>
            <Text>
              {props.detail}...
              <Text as={"span"} fontSize={"8"} color={"gray.600"}>
                <br />
                続きを読む
              </Text>
            </Text>
          </Box>
        </Center>
      </a>
    </Link>
  );
};
