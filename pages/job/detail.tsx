import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name;
  return {
    redirect: {
      statusCode: 301, // ステータスコード指定
      destination: `/workinfo/${encodeURI(name as string)}`, // リダイレクト先
    },
  };
};

export default function DetailPage() {
  return <></>;
}
