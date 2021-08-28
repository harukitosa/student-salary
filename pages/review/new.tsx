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
import { term, companyName, selectType, experience, workType, workdays } from "../types/type";

interface IFormInput {
	company_name_1: String;
	company_name_2: String;
}

export default function NewReviewPage() {
	return (
		<Container pt={12}>
		<ReviewForm />
	      </Container>
	)
}

const ReviewForm = () => {
	const { control, handleSubmit } = useForm<IFormInput>();


	const labelColor = "red.400";
	const space = "4";
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
	}
	
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
		</form>
		</>
	)
}