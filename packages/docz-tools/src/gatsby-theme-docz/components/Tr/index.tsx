import React, { PropsWithChildren } from "react";
import { Row } from "@jobber/components/Table";

export function Tr({ children }: PropsWithChildren<{}>) {
  // @ts-expect-error
  const isHeading = children[0].props.mdxType === "th";
  if (isHeading) {
    return <>{children}</>;
  }
  // @ts-expect-error
  return <Row>{children}</Row>;
}
