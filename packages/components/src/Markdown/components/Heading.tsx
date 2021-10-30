import React, { PropsWithChildren } from "react";
import { BaseElementProps } from "../BaseElementProps";
import { Heading as InternalHeading } from "../../Heading";

interface HeadingProps extends BaseElementProps, Record<string, any> {
  level: number;
}

export function Heading({
  level,
  children,
  node,
  ...props
}: PropsWithChildren<HeadingProps>) {
  return (
    <InternalHeading level={level as 1 | 2 | 3 | 4 | 5 | 6} {...props}>
      {children}
    </InternalHeading>
  );
}
