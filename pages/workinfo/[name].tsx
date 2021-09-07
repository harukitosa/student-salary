import {
  Container,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  chakra,
  Avatar,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { DataTable } from "../../component/simpletable";
import { ErrorPage } from "../../component/error";
import { useCompanyQuery } from "../../src/generated/graphql";
import { BlogPostWithImage } from "..";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

interface dataType {
  key: string;
  value: number;
}
export default function WorkInfo() {
  const router = useRouter();
  const { loading, error, data } = useCompanyQuery({
    variables: { name: router.query.name as string },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;

  // avarage
  let avg: number = 0;
  let mp: Map<String, number> = new Map();
  data.company[0].workdata.forEach((element) => {
    avg += element.salary;
    if (mp.has(element.type) && element.type !== undefined) {
      let n = mp.get(element.type) + 1;
      mp.set(element.type, n);
    } else {
      mp.set(element.type, 1);
    }
  });
  console.log(mp);
  avg = avg / data.company[0].workdata.length;

  let dataList: any[] = [];
  mp.forEach((item, key) => {
    dataList.push({ name: key, value: item });
  });

  return (
    <Container maxW={"5xl"}>
      <Heading pt={8} pb={8}>
        <Text
          as={"span"}
          position={"relative"}
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          _after={{
            content: "''",
            width: "full",
            position: "absolute",
            bottom: 1,
            left: 0,
            bg: "blue.400",
            height: "20%",
            zIndex: -1,
          }}
        >
          {data.company[0].name}
        </Text>
        <br />
        <Box h="8" />
        <SimpleGrid
          mt={"4"}
          columns={{ base: 1, md: 2, lg: 4, sm: 1 }}
          spacing={2}
        >
          <BlogPostWithImage
            title={"登録データ数"}
            num={data.company[0].count}
            icon={"/memory.svg"}
            unit={"件"}
          />
          <BlogPostWithImage
            title={"平均時給"}
            num={Math.round(avg)}
            icon={"/statistics.svg"}
            unit={"円"}
          />
          <BlogPostWithImage
            title={"時給の最小値"}
            num={data.company[0].min}
            icon={"/mouse.svg"}
            unit={"円"}
          />
          <BlogPostWithImage
            title={"時給の最大値"}
            num={data.company[0].max}
            icon={"/db.svg"}
            unit={"円"}
          />
        </SimpleGrid>
      </Heading>
      <Text fontSize={20} fontWeight={700}>
        開発領域
      </Text>
      <Container w="100%" bg="gray.200" mb="12">
        <Example data={dataList} />
      </Container>
      <Text fontSize={20} fontWeight={700}>
        データ
      </Text>
      <DataTable data={data.company[0].workdata} />
    </Container>
  );
}

const Example = (props: { data: any[] }) => {
  console.log(props);

  const COLORS = ["#00468b", "#0071bc", "#ff5050", "#e7e7e7"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    console.log("index:%d", index);
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="center"
        fontSize="18"
        fontWeight="bold"
      >
        {`${props.data[index].name}`}
      </text>
    );
  };
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart height={400}>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
