import {
  Heading,
  Text,
  Box,
  SimpleGrid,
  Center,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { DataTable } from "../../component/simpletable";
import { ErrorPage } from "../../component/error";
import { useCompanyQuery } from "../../src/generated/graphql";
import { BlogPostWithImage } from "..";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  BarChart,
} from "recharts";
import { BlogItemBlock } from "../blog/[name]";
import { ShareButton } from "../../component/shareButton";
import Head from "next/dist/next-server/lib/head";
import { ContributeButton } from "../../component/contributeButton";

export default function WorkInfo() {
  const router = useRouter();
  const { loading, error, data } = useCompanyQuery({
    variables: { name: router.query.name as string },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;

  // avarage
  // logic多いので後で移す
  let avg: number = 0;
  let mp: Map<String, number> = new Map();
  let typeMp: Map<String, number> = new Map();
  data.company[0].workdata.forEach((element) => {
    avg += element.salary;
    if (mp.has(element.type) && element.type !== undefined) {
      let n = mp.get(element.type) + 1;
      mp.set(element.type, n);
    } else {
      mp.set(element.type, 1);
    }

    if (typeMp.has(element.workType) && element.workType !== undefined) {
      let n = typeMp.get(element.workType) + 1;
      typeMp.set(element.workType, n);
    } else {
      typeMp.set(element.workType, 1);
    }
  });
  avg = avg / data.company[0].workdata.length;

  let dataList: any[] = [];
  mp.forEach((item, key) => {
    dataList.push({ name: key, value: item });
  });
  let dataList2: any[] = [];
  typeMp.forEach((item, key) => {
    dataList2.push({ type: key, count: item });
  });

  return (
    <Box>
      <Head>
        <title>StudentSalary {router.query.name as string}の情報まとめ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tosa_now" />
        <meta name="twitter:title" content="StudentSalary" />
        <meta
          property="og:title"
          content={`${router.query.name as string}の情報まとめ`}
        />
        <meta
          property="og:description"
          content="学生エンジニアの情報共有サイト"
        />
        <meta
          name="twitter:description"
          content="学生エンジニアの情報共有サイト"
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dam6j1bfo/image/upload/l_text:Sawarabi%20Gothic_65_bold:${
            router.query.name as string
          }の情報まとめ,co_rgb:333,w_800,c_fit/v1630839169/StudentOGP_pkno2h.jpg`}
        />
      </Head>
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
            title={"時給の最大値"}
            num={data.company[0].max}
            icon={"/db.svg"}
            unit={"円"}
          />
          <BlogPostWithImage
            title={"時給の最小値"}
            num={data.company[0].min}
            icon={"/mouse.svg"}
            unit={"円"}
          />
          <BlogPostWithImage
            title={"平均時給"}
            num={Math.round(avg)}
            icon={"/statistics.svg"}
            unit={"円"}
          />
        </SimpleGrid>
      </Heading>

      <Text fontSize={18} fontWeight={700} p="2" mt="6">
        データの割合
      </Text>
      <SimpleGrid
        bg="gray.100"
        mb="12"
        w="full"
        mt={"2"}
        columns={{ base: 1, md: 2, lg: 2, sm: 1 }}
        spacing={2}
      >
        <Box>
          <Text fontSize={16} fontWeight={700} p="2" mt="6" ml="6">
            開発領域
          </Text>
          <Example
            data={dataList}
            COLORS={[
              "#d7352b",
              "#ff6a55",
              "#ffa746",
              "#ffd976",
              "#92c7ff",
              "#5b97ee",
            ]}
          />
        </Box>
        <Box>
          <Text fontSize={16} fontWeight={700} p="2" mt="6" ml="6">
            契約種別
          </Text>
          <SimpleBar data={dataList2} />
        </Box>
      </SimpleGrid>
      <Text fontSize={20} fontWeight={700}>
        提供データ
      </Text>
      <DataTable data={data.company[0].workdata} />

      <Text fontSize="18" fontWeight="bold" mt="24" mb="8">
        インターン参加ブログ[外部サイト]
      </Text>
      {data.blog.blog.length !== 0 ? (
        data.blog.blog.map((item, index) => {
          return <BlogItemBlock key={index} item={item} />;
        })
      ) : (
        <Center>
          <Stack>
            <Text textAlign="center" fontSize="18" fontWeight="bold" py="4">
              データがありません
            </Text>
            <ContributeButton link={"https://forms.gle/dNwsVNqqq4MCsY6q6"} />
          </Stack>
        </Center>
      )}
      <ShareButton
        url={"https://www.student-salary.com" + router.asPath}
        title={`${router.query.name}の情報まとめ`}
      />
    </Box>
  );
}

const Example = (props: { data: any[]; COLORS: string[] }) => {
  const COLORS = props.COLORS;
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

const SimpleBar = (props: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={400}
        height={400}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="type" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#A78BFA" />
      </BarChart>
    </ResponsiveContainer>
  );
};
