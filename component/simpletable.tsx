import { Text, Box, Grid } from "@chakra-ui/react";
import { workdata } from "../types/type";
import Link from "next/link";

export const SimpleTable = (props: { data: workdata[] }) => {
  const tableHeader = [
    "企業名",
    "時給",
    "タイプ",
    "勤務期間",
    "経験年数",
    "週出勤日数",
    "雇用形態",
  ];
  return (
    <Grid
      templateColumns={{ md: "repeat(7, 1fr)", sm: "repeat(7, 1fr)" }}
      gap={0}
    >
      {tableHeader.map((item, index) => {
        return <SimpleTableTh key={index}>{item}</SimpleTableTh>;
      })}
      {props.data.map((item, index) => {
        return (
          <>
            <SimpleTableTh>
              <Link href={`/workinfo/${item.name}`} passHref>
                <Text fontWeight={800}>{item.name}</Text>
              </Link>
            </SimpleTableTh>
            <SimpleTableTh>{item.salary}</SimpleTableTh>
            <SimpleTableTh>{item.type}</SimpleTableTh>
            <SimpleTableTh>{item.term}</SimpleTableTh>
            <SimpleTableTh>{item.experience}</SimpleTableTh>
            <SimpleTableTh>{item.workdays}</SimpleTableTh>
            <SimpleTableTh>{item.workType}</SimpleTableTh>
          </>
        );
      })}
    </Grid>
  );
};

const SimpleTableTh = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
  fontSize?: Number;
}) => {
  const fontsize = props.fontSize == undefined ? "1px" : props.fontSize + "px";
  return (
    <Box w="100%" h="10" borderBottom={fontsize} borderColor={"gray.200"}>
      <Text lineHeight={"10"} fontSize={"sm"} textColor={"gray.800"}>
        {props.children}
      </Text>
    </Box>
  );
};
