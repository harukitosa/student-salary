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
import { WorkData } from "../src/generated/graphql";

interface WorkDataArgument extends Omit<WorkData, "workType"> {
  work_type?: string;
}

export const DataTable = (props: { data: WorkDataArgument[] }) => {
  return (
    <Accordion allowToggle>
      {props.data.slice(0, 30).map((item) => {
        return (
          <AccordionItem key={item.id}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Stack direction="column" gridGap={0}>
                    <Link
                      href={`/workinfo/[name]`}
                      as={`/workinfo/${item.name}`}
                    >
                      <a>
                        <Text fontSize="18" fontWeight="600" color="blue.400">
                          {item.name}
                        </Text>
                      </a>
                    </Link>
                    <Text as="span" fontSize="12">
                      {item.work_type || "記載なし"}
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
                      {item.type === "" ? "記載なし" : item.type}
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
                      {item.term || "記載なし"}
                    </Text>
                  </Stack>
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack>
                <Text>経験年数:{item.experience || "記載なし"}</Text>
                <Text>週出勤日数:{item.workdays || "記載なし"}</Text>
                <Text fontSize="12">詳細</Text>
                <Text>{item.detail || "記載なし"}</Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
