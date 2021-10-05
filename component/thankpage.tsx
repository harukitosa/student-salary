import { Container, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
export const ThankPage = () => {
  const pic = "/done.png";

  return (
    <Container maxW={"lg"}>
      <Image
        src={pic}
        alt="Picture of the author"
        width={400}
        height={400}
        objectFit="none"
      />
      <Text fontSize={"28"} fontWeight={"bold"}>
        ご協力ありがとうございます！
      </Text>
      <Text fontSize={"22"} fontWeight={"semibold"}>
        Thank You!
      </Text>
      <Box h={8} />
      <Text fontSize={"16"} fontWeight={"medium"}>
        ご登録いただいたデータは運営者の確認が入ります。掲載・表示まで少しお時間がかかる場合がございますのでご了承ください。
        <br />
        会社名にかぎり、データの統一させていただくために、修正変更等をさせていただく場合がございますがご了承ください。
        <br />
        これからのご活躍を期待しています。
      </Text>
    </Container>
  );
};
