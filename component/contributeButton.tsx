import { Button } from "@chakra-ui/button";
import { LinkBlock } from "./LInkBlock";

// "https://forms.gle/dNwsVNqqq4MCsY6q6"
export const ContributeButton = (props: { link: string }) => {
  return (
    <LinkBlock url={props.link}>
      <Button bg="blue.200" rounded="full" w="60" h="12">
        Contribute
      </Button>
    </LinkBlock>
    //   </a>
    // </Link>
  );
};
