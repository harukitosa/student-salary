import { FC } from "react";
import Link from "next/link";

export const LinkBlock: FC<{ url: string; is_external?: Boolean }> = ({
  url,
  is_external = false,
  children,
}) => {
  if (is_external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={url}>
      <a>{children}</a>
    </Link>
  );
};
