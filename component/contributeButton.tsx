import { Button } from "@chakra-ui/button";
import Link from "next/link";

// "https://forms.gle/dNwsVNqqq4MCsY6q6"
export const ContributeButton = (props: { link: string }) => {
  return (
    <Link href={props.link}>
      <a>
        <Button border="2px" bg="white" w="60" h="12">
          フォームで入力
        </Button>
      </a>
    </Link>
  );
};
