import { Text, Container, Box, Input, useControllableState } from "@chakra-ui/react";
import data from "../../../intern2021.json";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
export async function getStaticProps({ params }) {
  return {
    props: { data },
  };
}

export default function InternPage({ data }) {
  const [value, setValue] = useControllableState({ defaultValue: "" })
  const viewList = data.filter((item) => {return item.company_name.toUpperCase().includes(value.toUpperCase())});

  return (
    <Container minH="100vh">
      <Container py="8">
        <Text align="center" as="h1" fontSize="28" fontWeight="bold">
          2021年
          <br /> 夏のインターンスプレッドシート専用UI
        </Text>
        <a
          href={
            "https://docs.google.com/spreadsheets/d/1O4LqD6tfVisshD4YngjEKwpU1FQCGuD8vZ1qlVX0sBY/edit#gid=1644405096"
          }
        >
          <Text fontSize="18" fontWeight="bold" color="blue.400">
            スプレッドシートはこちら
          </Text>
        </a>
      </Container>

      <Text fontSize="14" fontWeight="bold">企業名で検索</Text>
      <Input mb="12" onChange={(e) => setValue(e.target.value)} />
      {viewList.length == 0 ? <Text textAlign="center" fontSize="18" fontWeight="bold">検索結果なし</Text> : <></>}
      {viewList.map((item) => {
        return (
          <Link key={item.id} href={`/intern/2021/${item.id}`}>
            <a>
              <Box py={2}>
                <Text fontSize="18" fontWeight="semibold">
                  <ChevronRightIcon color="blue.400" h="8" w="8" />
                  {item.company_name}
                </Text>
                <Text p="4">
                  {item.content.slice(0, 140)}
                  {item.content != undefined && item.content.length > 140
                    ? "..."
                    : ""}
                </Text>
              </Box>
            </a>
          </Link>
        );
      })}
    </Container>
  );
}
