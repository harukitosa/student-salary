import { Text, Box, Grid } from "@chakra-ui/react";
import { workdata } from "../types/type";
import Link from "next/link";
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useRouter } from "next/router";

// export const SimpleTable = (props: { data: workdata[] }) => {

//   return (
//     <Grid
//       templateColumns={{ md: "repeat(7, 1fr)", sm: "repeat(7, 1fr)" }}
//       gap={0}
//     >
//       {tableHeader.map((item, index) => {
//         return <SimpleTableTh key={index}>{item}</SimpleTableTh>;
//       })}
//       {props.data.map((item, index) => {
//         return (
//           <>
//             <SimpleTableTh>
//               <Link href={`/workinfo/${item.name}`} passHref>
//                 <Text fontWeight={800}>{item.name}</Text>
//               </Link>
//             </SimpleTableTh>
//             <SimpleTableTh>{item.salary}</SimpleTableTh>
//             <SimpleTableTh>{item.type}</SimpleTableTh>
//             <SimpleTableTh>{item.term}</SimpleTableTh>
//             <SimpleTableTh>{item.experience}</SimpleTableTh>
//             <SimpleTableTh>{item.workdays}</SimpleTableTh>
//             <SimpleTableTh>{item.workType}</SimpleTableTh>
//           </>
//         );
//       })}
//     </Grid>
//   );
// };

// const SimpleTableTh = (props: {
//   children:
//     | boolean
//     | React.ReactChild
//     | React.ReactFragment
//     | React.ReactPortal;
//   fontSize?: Number;
// }) => {
//   const fontsize = props.fontSize == undefined ? "1px" : props.fontSize + "px";
//   return (
//     <Box w="100%" h="10" borderBottom={fontsize} borderColor={"gray.200"}>
//       <Text lineHeight={"10"} fontSize={"sm"} textColor={"gray.800"}>
//         {props.children}
//       </Text>
//     </Box>
//   );
// };

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

export const DataTable = (props: { data: workdata[] }) => {
  const router = useRouter();
  const handleRowSelection = (e) => {
    for (let i = 0; i < props.data.length; i++) {
      if (e[0] === props.data[i].id) {
        router.push(`/workinfo/${props.data[i].name}`);
      }
    }
  };
  const pageSize = props.data.length > 15 ? 15 : props.data.length;
  return (
    <div style={{ height: pageSize * 50 + 150, width: "100%" }}>
      <DataGrid
        rows={props.data}
        columns={columns}
        pageSize={pageSize}
        onSelectionModelChange={handleRowSelection}
      />
    </div>
  );
};
