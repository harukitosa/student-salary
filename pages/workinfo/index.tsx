import { Box, Container, Text, Heading } from "@chakra-ui/react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
} from "recharts";
import Link from "next/link";
import { ErrorPage } from "../../component/error";
import { Company, useGetWorkinfoQuery } from "../../src/generated/graphql";
import { Loading } from "../../component/loading";
import { SEO } from "../../component/seo";
import router from "next/router";

export default function WorkInfo() {
  const { loading, error, data } = useGetWorkinfoQuery();
  if (loading) return <Loading />;
  if (error) return <ErrorPage />;
  return (
    <>
      <SEO
        title="エンジニアのインターン・アルバイトの時給一覧情報"
        description="インターンシップ、アルバイト、業務委託の学生エンジニアの時給情報を一覧画面です。"
        imageText="企業時給一覧"
        url={"https://www.student-salary.com/" + router.asPath}
      />
      <Container maxW={"5xl"}>
        <Box pt={8} pb={8}>
          <Heading pt={8} pb={8}>
            <Text fontSize={"3xl"} fontWeight={800} as={"h1"}>
              エンジニアインターン・アルバイト時給一覧情報
            </Text>
            <Text fontSize="16" fontWeight="500" pt="4">
              登録された時給情報の企業別一覧画面です。
              <br />
              水色の点はインターンシップ、オレンジ色の点はアルバイト・業務委託の時給値です。
            </Text>
          </Heading>
        </Box>
        {data.company.map((item, index) => {
          return (
            <div key={index}>
              <Link href={`/workinfo/${item.name}`}>
                <a>
                  <Text fontSize={"md"} fontWeight={"smibold"} as="h2">
                    {item.name}
                  </Text>
                  <Text fontSize={"sm"}>
                    [登録数:{item.count}件]{item.min}
                    <Text as="span" fontSize="x-small">
                      円
                    </Text>
                    ~{item.max}
                    <Text as="span" fontSize="x-small">
                      円
                    </Text>
                  </Text>
                </a>
              </Link>
              <Chart company={item} />
            </div>
          );
        })}
      </Container>
    </>
  );
}

const Chart = (props: { company: Company }) => {
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
        <Tooltip cursor={{ strokeDasharray: "10 10" }} />
        {props.company.workdata.map((item, index) => {
          if (item.workType === "インターン") {
            return (
              <Scatter
                fillOpacity="0.6"
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
              fillOpacity="0.6"
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
