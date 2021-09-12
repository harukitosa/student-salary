import {
  Divider,
  SimpleGrid,
  GridItem,
  Text,
  Box,
} from "@chakra-ui/layout";
import { FC, useMemo } from "react";

export const InternItem: FC = function ({ children }) {
  return (
    <>
      <Divider />
      <SimpleGrid
        py="4"
        // columns={{ base: 1, md: 2, lg: 2, sm: 1 }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        spacing={2}
      >
        {children}
      </SimpleGrid>
    </>
  );
};

export const InternItemTitle: FC<{ title: string }> = function ({ title }) {
  return (
    <GridItem colSpan={{ base: 1, md: 1 }}>
      <Text fontSize="18" fontWeight="bold">
        {title}
      </Text>
    </GridItem>
  );
};

export const InternItemContent: FC<{ content: string }> = function ({
  content,
}) {
  return (
    <GridItem colSpan={{ base: 1, md: 2 }} maxW="100vw">
      <Box>
        <Text>
          {content === undefined || content == "" ? "記載なし" : content}
        </Text>
      </Box>
    </GridItem>
  );
};

export const InternItemUrl: FC<{ url: string }> = function ({ url: rawUrl }) {
  const url = useMemo(() => {
    const trimmed = rawUrl.trim();
    return trimmed.startsWith("http") ? (
      <Text color="blue.400">
        <a href={trimmed} target="_blank" rel="noreferrer">
          {trimmed}
        </a>
      </Text>
    ) : (
      rawUrl
    );
  }, [rawUrl]);
  return (
    <GridItem colSpan={{ base: 1, md: 2 }} maxW="100vw">
      <Box>
        <Text>{url == "" ? "記載なし" : url}</Text>
      </Box>
    </GridItem>
  );
};
