import React, { PropsWithChildren } from "react";

interface LinkProps {
  readonly external?: boolean;
  readonly url: string;
}

export function Link({
  external = false,
  url,
  children,
}: PropsWithChildren<LinkProps>) {
  const target = external ? "_blank" : "_self";

  return (
    <a target={target} href={url}>
      {children}
    </a>
  );
}
