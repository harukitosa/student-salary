import { NextSeo } from "next-seo";

interface SEO {
  title?: string;
  description?: string;
  imageText?: string;
  url?: string;
}

export const SEO = (props: SEO) => {
  return (
    <NextSeo
      title={
        props.title
          ? props.title + " | StudentSalary"
          : "StudentSalary 学生エンジニアの情報共有サイト"
      }
      description={props.description ? props.description : ""}
      canonical="https://www.student-salary.com/"
      twitter={{
        cardType: "summary_large_image",
      }}
      openGraph={{
        url: props.url ? props.url : "https://www.student-salary.com/",
        title: props.title
          ? props.title
          : "StudentSalary 学生エンジニアの情報共有サイト",
        description: props.description
          ? props.description
          : "学生エンジニアの情報共有サイト",
        images: [
          {
            url: props.imageText
              ? "https://res.cloudinary.com/dam6j1bfo/image/upload/l_text:Sawarabi%20Gothic_65_bold:" +
                props.imageText +
                ",co_rgb:333,w_800,c_fit/v1630839169/StudentOGP_pkno2h.jpg"
              : "https://www.student-salary.com/StudentOGP.jpeg",
            alt: "Og Image Alt",
          },
        ],
      }}
    />
  );
};
