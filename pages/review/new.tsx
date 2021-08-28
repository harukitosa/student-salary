import { useMutation } from "@apollo/client";
import {
  Text,
  Container,
  Box,
  Input,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CREATE_REVIEW } from "../../request/queries/workinfopage.query";
import {
  companyName,
} from "../../types/type";
import { ThankPage } from "../../component/thankpage";

interface IFormInput {
  company_name_1: String;
  company_name_2: String;
  user_name: String;
  report: String;
  skill: String;
  link: String;
  reason: String;
  content: String;
}

export default function NewReviewPage() {
  return (
    <Container pt={12}>
      <ReviewForm />
    </Container>
  );
}

const ReviewForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);

  const labelColor = "red.400";
  const space = "4";

  const validation = (data: IFormInput) => {
    if (data.company_name_1 === "-" && data.company_name_2 === "") return false;
    if (data.report === "") return false;
    return true;
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    if (!validation(data)) {
	alert("未記入事項があります");
	return;
    }
    const company_name =
      data.company_name_2 === "" ? data.company_name_1 : data.company_name_2;
    createReview({
      variables: {
        company_name: company_name,
        user_name: data.user_name,
        content: data.content,
        skill: data.skill,
        link: data.link,
	report: data.report,
        reasons: data.reason,
      },
    });
  };

  if (loading) return (
  <Text>loading</Text>
  );
  if (error) {
	  console.log(error)
  return (
  <Text>Error</Text>
  );
  }
  if (data) return (<ThankPage />);

  return (
    <>
      <Text as={"h1"} fontSize={"2xl"} fontWeight={"bold"}>
        インターンシップの口コミ登録
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

        <FormLabel pt={"4"}>
          <Text as={"span"} fontSize={"sm"}>
            ユーザーネーム
          </Text>
        </FormLabel>
        <Controller
          name="user_name"
          control={control}
          defaultValue="名無しの天才エンジニア"
          render={({ field }) => <Input type={"text"} {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          ユーザーネームを記入してください、口コミに表示されます。
        </Text>
        <Box py={space} />

        <FormLabel pt={"4"}>
          <Text as={"span"} fontSize={"sm"}>
            使用した技術
          </Text>
        </FormLabel>
        <Controller
          name="skill"
          control={control}
          defaultValue=""
          render={({ field }) => <Input type={"text"} {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          例: golang, vue, aws, terraform, bigQuery(箇条書き)
        </Text>
        <Box py={space} />

        <FormLabel>業務内容</FormLabel>
        <Controller
          name="content"
          control={control}
          defaultValue={""}
          render={({ field }) => <Textarea {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          簡単な概要を記入してください
        </Text>
        <Box py={space} />

        <FormLabel>応募した理由</FormLabel>
        <Controller
          name="reason"
          control={control}
          defaultValue={""}
          render={({ field }) => <Textarea height={40} {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          このインターンに応募した理由記入してください。
        </Text>
        <Box py={space} />

        <FormLabel>
          感想・一推しポイント・詳細など
          <Text as={"span"} color={labelColor}>
            [必須]
          </Text>
        </FormLabel>
        <Controller
          name="report"
          control={control}
          defaultValue={""}
          render={({ field }) => <Textarea height={40} {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          このインターンの感想やイチオシポイントやどのようなことが印象に残ったのかを記入してください
        </Text>
        <Box py={space} />

        <FormLabel pt={"4"}>
          <Text as={"span"} fontSize={"sm"}>
            参考リンク
          </Text>
        </FormLabel>
        <Controller
          name="link"
          control={control}
          defaultValue=""
          render={({ field }) => <Input type={"text"} {...field} />}
        />
        <Text fontSize={14} fontWeight={"light"} color={"gray.500"}>
          現在募集中や企業情報など、参考リンクがあれば記入してください
        </Text>
        <Box py={space} />

        <Input type="submit" />
      </form>
    </>
  );
};
