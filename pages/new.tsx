import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Input,
  Container,
  FormLabel,
  Text,
  Select,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { CREATE_WORKDATA } from "../request/queries/workinfopage.query";
import { useMutation } from "@apollo/client";
import {
  term,
  companyName,
  selectType,
  experience,
  workType,
  workdays,
} from "../types/type";
import { ThankPage } from "../component/thankpage";
import { ErrorPage } from "../component/error";
import { SEO } from "../component/seo";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

export default function workinfonewPage() {
  return (
    <Container pt={12}>
      <SEO />
      <WorkinfoForm />
    </Container>
  );
}

interface IFormInput {
  detail: String;
  experience: String;
  company_name_1: String;
  company_name_2: String;
  salary: Number;
  term: String;
  type: String;
  workdays: String;
  workType: String;
}

const WorkinfoForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();
  const [createWorkdata, { data, loading, error }] =
    useMutation(CREATE_WORKDATA);

  const validation = (data: IFormInput) => {
    if (data.company_name_1 === "-" && data.company_name_2 === "") return false;
    if (data.salary == undefined) return false;
    return true;
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // @ts-ignore
    if (!validation(data)) {
      alert("未記入事項があります");
      return;
    }
    const company_name =
      data.company_name_2 === "" ? data.company_name_1 : data.company_name_2;
    createWorkdata({
      variables: {
        name: company_name,
        salary: data.salary,
        detail: data.detail,
        experience: data.experience,
        term: data.term,
        workType: data.workType,
        workdays: data.workdays,
        type: data.type,
      },
    });
  };

  const labelColor = "red.400";
  const space = "4";

  if (loading) return <Text>loading</Text>;
  if (error) return <ErrorPage />;
  if (data) return <ThankPage />;

  return (
    <>
      <Text as={"h1"} fontSize={"2xl"} fontWeight={"bold"}>
        時給登録フォーム
      </Text>
      <Box py={4} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>
          企業名
          <Text as={"span"} color={labelColor}>
            [必須]
          </Text>
        </FormLabel>
        <FormLabel>
          <Text as={"span"} fontSize={"sm"}>
            選択欄
          </Text>
        </FormLabel>
        <Controller
          name="company_name_1"
          control={control}
          defaultValue={"-"}
          render={({ field }) => (
            // @ts-ignore
            <Select {...field}>
              {companyName.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
          )}
        />
        <FormLabel pt={"4"}>
          <Text as={"span"} fontSize={"sm"}>
            上にない場合は下の欄に企業名を記入してください
          </Text>
        </FormLabel>
        <Controller
          name="company_name_2"
          control={control}
          defaultValue=""
          // @ts-ignore
          render={({ field }) => <Input type={"text"} {...field} />}
        />
        <Box py={space} />
        <FormLabel>
          時給
          <Text as={"span"} color={labelColor}>
            [必須]
          </Text>
        </FormLabel>
        <Controller
          name="salary"
          control={control}
          // @ts-ignore
          render={({ field }) => <Input type={"number"} {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          日本円で1時間あたりの給料を記入してください
          時間給ではない場合は、給料÷労働時間の値を記入してください。
        </Text>
        <Box py={space} />

        <FormLabel>開発領域</FormLabel>
        <Controller
          name="type"
          control={control}
          defaultValue={"記載なし"}
          render={({ field }) => (
            // @ts-ignore
            <Select {...field}>
              {selectType.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
          )}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          携わった分野を記入してください。
        </Text>
        <Box py={space} />

        <FormLabel>雇用契約種類</FormLabel>
        <Controller
          name="workType"
          control={control}
          defaultValue={"インターン"}
          render={({ field }) => (
            // @ts-ignore
            <Select {...field}>
              {workType.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
          )}
        />
        <Box py={space} />

        <FormLabel>経験年数</FormLabel>
        <Controller
          name="experience"
          control={control}
          defaultValue={"0.5"}
          render={({ field }) => (
            // @ts-ignore
            <Select {...field}>
              {experience.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
          )}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          プログラミング、開発を始めてからの年数を記入してください。
        </Text>
        <Box py={space} />

        <FormLabel>勤務期間</FormLabel>
        <Controller
          name="term"
          control={control}
          defaultValue={"1day"}
          render={({ field }) => (
            // @ts-ignore
            <Select {...field}>
              {term.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
          )}
        />
        <Box py={space} />

        <FormLabel>週出勤日数</FormLabel>
        <Controller
          name="workdays"
          control={control}
          defaultValue={"記載なし"}
          render={({ field }) => (
            // @ts-ignore
            <Select {...field}>
              {workdays.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Select>
          )}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          一週間に出勤した日数を記入してください。
        </Text>
        <Box py={space} />

        <FormLabel>詳細</FormLabel>
        <Controller
          name="detail"
          control={control}
          defaultValue={""}
          // @ts-ignore
          render={({ field }) => <Textarea {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          業務内容、使用した言語、技術等を記入してください。
        </Text>
        <Box py={space} />
        <Input type="submit" />
      </form>
    </>
  );
};
