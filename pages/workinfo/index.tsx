import { Box, Container, Text, Heading } from "@chakra-ui/react";
import {
  WORKINFOTOPPAGE_QUERY,
  WORKINFOTOPPAGE_QUERY_DATA,
} from "../../request/queries/workinfopage.query";
import { useQuery } from "@apollo/client";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
} from "recharts";
import { company } from "../../types/type";
import Link from "next/link";
import { ErrorPage } from "../../component/error";

export default function WorkInfo() {
  const { loading, error, data } = useQuery<WORKINFOTOPPAGE_QUERY_DATA>(
    WORKINFOTOPPAGE_QUERY
  );
  if (loading) return <Text>Loading...</Text>;
  if (error) return <ErrorPage />;
  return (
    <Container maxW={"5xl"}>
      <Box pt={8} pb={8}>
        <Heading pt={8} pb={8}>
          <Text fontSize={"3xl"} fontWeight={800} as={"h1"}>
            企業一覧
          </Text>
          <Text fontSize={"md"} pt="4" color="gray.600">
            水色の点はインターンシップ
          </Text>
        </Heading>
      </Box>
      {data.company.map((item, index) => {
        return (
          <div key={index}>
            <Link href={`/workinfo/${item.name}`} passHref>
              <Text fontSize={"md"} fontWeight={"medium"}>
                {item.name}
                <Text color={"gray.400"} fontSize={"sm"}>
                  データ数:{item.count} max:{item.max} min:{item.min}
                </Text>
              </Text>
            </Link>

            <Chart company={item} />
          </div>
        );
      })}
    </Container>
  );
}

const Chart = (props: { company: company }) => {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="salary"
          name="salary"
          domain={[0, 5000]}
        />
        <YAxis type="category" dataKey="name" name="name" tick={false} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {props.company.workdata.map((item, index) => {
          if (item.workType === "インターン") {
            return (
              <Scatter
                fillOpacity="0.1"
                key={index}
                dataKey="salary"
                name="salary"
                data={[item]}
                fill="#0EA5E9"
                stroke="#0EA5E9"
              />
            );
          }
          return (
              <Scatter
                fillOpacity="0.1"
                key={index}
                dataKey="salary"
                name="salary"
                data={[item]}
                fill="#ff5900"
                stroke="#ff5900"
              />
          );
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
