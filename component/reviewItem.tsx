import { Text, Center, Heading, Box } from "@chakra-ui/react";

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
        <Center>
          <Box
            // bg={useColorModeValue("white", "gray.900")}
            border={"1px"}
            borderRadius={"3xl"}
            borderColor={"blackAlpha.200"}
            _hover={{
              borderColor: "blue.400",
            }}
            p={4}
            m={1}
            h="40"
            w={"full"}
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
