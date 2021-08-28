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
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

export default function workinfonewPage() {
  return (
    <Container w="lg" pt="12">
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
  const [createWorkdata, { data, loading, error }] = useMutation(CREATE_WORKDATA);

  const validation = (data: IFormInput) => {
    if (data.company_name_1 === "-" && data.company_name_2 === "") return false;
    if (data.salary == undefined) return false;
    return true;
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    if (!validation(data)) {
      alert("未記入事項があります")
      return;
    }
    const company_name = data.company_name_2 === "" ? data.company_name_1 : data.company_name_2;
    createWorkdata({variables: {
      name: company_name,
      salary: data.salary,
      detail: data.detail,
      experience: data.experience,
      term: data.term,
      workType: data.workType,
      workdays: data.workdays,
      type: data.type,
    }})
  };

  const labelColor = "red.400";
  const space = "4";

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  if (true) return `done`;

  return (
    <>
    <Text as={"h1"} fontSize={"xl"}>
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
        render={({ field }) => <Input type={"number"} {...field} />}
      />
      <Box py={space} />

      <FormLabel>開発領域</FormLabel>
      <Controller
        name="type"
        control={control}
        defaultValue={"記載なし"}
        render={({ field }) => (
          <Select {...field}>
            {selectType.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </Select>
        )}
      />
      <Box py={space} />

      <FormLabel>雇用契約種類</FormLabel>
      <Controller
        name="workType"
        control={control}
        defaultValue={"インターン"}
        render={({ field }) => (
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
          <Select {...field}>
            {experience.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </Select>
        )}
      />
      <Box py={space} />

      <FormLabel>勤務期間</FormLabel>
      <Controller
        name="term"
        control={control}
        defaultValue={"1day"}
        render={({ field }) => (
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
          <Select {...field}>
            {workdays.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </Select>
        )}
      />
      <Box py={space} />

      <FormLabel>詳細</FormLabel>
      <Controller
        name="detail"
        control={control}
        defaultValue={""}
        render={({ field }) => <Textarea {...field} />}
      />

      <Box py={space} />
      <Input type="submit" />
    </form>
    </>
  );
};

const companyName = [
  "-",
  "DMM",
  "mercari",
  "CyberAgent"
]

const selectType = [
  "記載なし",
  "iOS",
  "Android",
  "Mobile",
  "Web Frontend",
  "Fullstack",
  "Backend",
  "AI/ML",
  "Infra",
  "Site Reliability(SRE)",
  "Security",
  "Devops",
  "Data",
  "Networking",
  "その他",
];

const workType = ["インターン", "アルバイト", "業務委託", "その他"];

const experience = [
  "0.5",
  "1",
  "1.5",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10年以上",
];

const workdays = ["1", "2", "3", "4", "5", "記載なし"];

const term = [
  "1day",
  "2days",
  "1week",
  "2weeks",
  "3weeks",
  "1month",
  "2~3month",
  "6months",
  "1year",
  "2~3year",
  "More than 3 years",
];
