import { Flex, Box } from "@chakra-ui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export const ShareButton = (props: { url: string; title: string }) => {
  return (
    <Flex pt="12">
      <TwitterShareButton url={props.url} title={props.title}>
        <TwitterIcon size={42} round={true} />
      </TwitterShareButton>
      <Box px="1" />
      <FacebookShareButton url={props.url}>
        <FacebookIcon size={42} round={true} />
      </FacebookShareButton>
    </Flex>
  );
};
