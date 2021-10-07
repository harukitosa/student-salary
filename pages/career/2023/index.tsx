import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { SEO } from "../../../component/seo";

export default function Career2023Page() {
  return (
    <>
      <SEO
        title={`2023卒ソフトウェアエンジニア就活情報ページ`}
        imageText={`2023卒ソフトウェアエンジニア就活情報ページ`}
      />
      <Box w={{ base: "95vw", md: "50vw" }} m="auto" mt="12">
        <Text as="h1" fontSize="4xl" fontWeight="bold">
          2023年度ソフトウェアエンジニア新卒採用ページ！
        </Text>
        <Text fontSize="md">
          23卒のソフトウェアエンジニアを募集している企業を一覧で掲載しています。
          <br />
          記載されている情報は精査して掲載していますが、リンク先の変更による間違い等があるので必ず参照元のサイトをご確認ください。
        </Text>
        <Text>
          応募が開始次第適宜収取追加していきます。 * 管理者Twitter{" "}
          <LinkItem herf={"https://twitter.com/tosa_now"}>@tosa_now</LinkItem>
          に23新卒情報をご連絡いただければこちらに掲載します。
        </Text>

        <BoxItem>
          <TitleItem>Voyage Group</TitleItem>
          <ContentItem>サマーインターンTreasureが大人気。</ContentItem>
          <SubtitleItem>新卒採用情報</SubtitleItem>
          <ContentBox>
            【第2回ES締切】10/25(月)AM9:00
            <br />
            <LinkItem herf="https://voyagegroup.snar.jp/jobboard/detail.aspx">
              https://voyagegroup.snar.jp/jobboard/detail.aspx
            </LinkItem>{" "}
            <br />
            コーポレートページ
            <br />
            <LinkItem herf="https://voyagegroup.com/">
              https://voyagegroup.com/
            </LinkItem>
          </ContentBox>
        </BoxItem>

        <BoxItem>
          <TitleItem>Visional</TitleItem>
          <ContentItem>ビズリーチが有名</ContentItem>
          <SubtitleItem>新卒採用情報</SubtitleItem>
          <ContentBox>
            【第2回ES締切】10/25(月)AM9:00
            <br />
            <LinkItem herf="https://hrmos.co/pages/hrmos/jobs/3100100100906 ">
              https://hrmos.co/pages/hrmos/jobs/3100100100906
            </LinkItem>{" "}
            <br />
            コーポレートページ
            <br />
            <LinkItem herf="https://www.visional.inc/ja/index.html">
              https://www.visional.inc/ja/index.html
            </LinkItem>
          </ContentBox>
        </BoxItem>

        <BoxItem>
          <TitleItem>Cyberagent</TitleItem>
          <ContentItem>メディア・広告・ゲーム事業</ContentItem>
          <SubtitleItem>新卒採用情報</SubtitleItem>
          <ContentBox>
            先取り先行(終了済み)
            <br />
            <LinkItem herf="https://www.cyberagent.co.jp/careers/special/students/tech/">
              https://www.cyberagent.co.jp/careers/special/students/tech/
            </LinkItem>{" "}
            <br />
            コーポレートページ
            <br />
            <LinkItem herf="https://www.cyberagent.co.jp/">
              https://www.cyberagent.co.jp/
            </LinkItem>
          </ContentBox>
        </BoxItem>

        <BoxItem>
          <TitleItem>mixi</TitleItem>
          <SubtitleItem>新卒採用情報</SubtitleItem>
          <ContentBox>
            23新卒採用情報
            <br />
            <LinkItem herf="https://mixi-recruit.snar.jp/jobboard/detail.aspx">
              https://mixi-recruit.snar.jp/jobboard/detail.aspx
            </LinkItem>{" "}
            <br />
            コーポレートページ
            <br />
            <LinkItem herf="https://mixi.co.jp/">https://mixi.co.jp/</LinkItem>
          </ContentBox>
        </BoxItem>

        <BoxItem>
          <TitleItem>PLAID</TitleItem>
          <SubtitleItem>新卒採用情報</SubtitleItem>
          <ContentBox>
            23新卒採用情報
            <br />
            <LinkItem herf="https://recruit.plaid.co.jp/">
              https://recruit.plaid.co.jp/
            </LinkItem>{" "}
            <br />
            コーポレートページ
            <br />
            <LinkItem herf="https://plaid.co.jp/">
              https://plaid.co.jp/
            </LinkItem>
          </ContentBox>
        </BoxItem>

        <BoxItem>
          <TitleItem>DeNA</TitleItem>
          <SubtitleItem>新卒採用情報</SubtitleItem>
          <ContentBox>
            23新卒採用情報
            <br />
            <LinkItem herf="https://student.dena.com/">
              https://student.dena.com/
            </LinkItem>{" "}
            <br />
            コーポレートページ
            <br />
            <LinkItem herf="https://dena.com/jp/">
              https://dena.com/jp/
            </LinkItem>
          </ContentBox>
        </BoxItem>
      </Box>
    </>
  );
}

const TitleItem: FC = function ({ children }) {
  return (
    <Text as="h2" fontSize="28" fontWeight="bold">
      # {children}
    </Text>
  );
};

const SubtitleItem: FC = function ({ children }) {
  return (
    <Text as="h3" fontSize="22" fontWeight="600">
      {children}
    </Text>
  );
};

const BoxItem: FC = function ({ children }) {
  return <Box my="4">{children}</Box>;
};

const ContentBox: FC = function ({ children }) {
  return <Box>{children}</Box>;
};

const ContentItem: FC = function ({ children }) {
  return (
    <Text as="p" fontSize="18">
      {children}
    </Text>
  );
};

const LinkItem: FC<{ herf: string }> = function ({ herf, children }) {
  return (
    <Text as="span" color="blue.400">
      <a href={herf} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Text>
  );
};

// const H1 = (props: {})
// export const TitleItem: FC<{ content: string }> = function ({
//   content,
// }) {
//   return (
//       <Box>
//         <Text as="h2">
//           {content}
//         </Text>
//       </Box>
//   );
// };
