import {
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/router";
import { WorkData } from "../src/generated/graphql";

const columns = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "name",
    headerName: "企業名",
    width: 150,
  },
  {
    field: "salary",
    headerName: "時給",
    width: 120,
  },
  {
    field: "workType",
    headerName: "契約種別",
    type: "string",
    width: 140,
  },
  {
    field: "type",
    headerName: "タイプ",
    type: "string",
    width: 120,
  },
  {
    field: "term",
    headerName: "期間",
    type: "string",
    width: 120,
  },
  {
    field: "experience",
    headerName: "経験年数",
    type: "number",
    width: 140,
  },
  {
    field: "workdays",
    headerName: "週出勤日数",
    type: "number",
    width: 150,
  },
];

export const DataTable = (props: { data: WorkData[] }) => {
  const router = useRouter();

  return (
    <Accordion allowToggle>
      {props.data.slice(0, 30).map((item) => {
        return (
          <AccordionItem key={item.id}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Stack direction="column" gridGap={0}>
                    <Link href={`/workinfo/${item.name}`}>
                      <a>
                        <Text fontSize="18" fontWeight="600" color="blue.400">
                          {item.name}
                        </Text>
                      </a>
                    </Link>
                    <Text as="span" fontSize="12">
                      {item.workType}
                    </Text>
                  </Stack>
                </Box>
                <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                  <Text fontSize="18">{item.salary}円/hr</Text>
                  <Text
                    fontSize="12"
                    display={{ base: "block", md: "none" }}
                    fontWeight="semibold"
                  >
                    {item.type}
                  </Text>
                </Box>
                <Box
                  flex="1"
                  textAlign="left"
                  display={{ base: "none", md: "block" }}
                >
                  <Stack direction="column" gridGap={0}>
                    <Text fontSize="18" fontWeight="400">
                      {item.type}
                    </Text>
                  </Stack>
                </Box>
                <Box
                  flex="1"
                  textAlign="left"
                  display={{ base: "none", md: "block" }}
                >
                  <Stack direction="column" gridGap={0}>
                    <Text fontSize="18" fontWeight="400">
                      {item.term}
                    </Text>
                  </Stack>
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack>
                <Text>経験年数:{item.experience}</Text>
                <Text>週出勤日数:{item.workdays}</Text>
                <Text fontSize="12">詳細</Text>
                <Text>{item.detail}</Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
