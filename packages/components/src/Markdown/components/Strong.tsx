import React, { PropsWithChildren } from "react";
import { Emphasis as InternalStrong } from "../../Emphasis";
import { BaseElementProps } from "../BaseElementProps";

interface StrongProps extends BaseElementProps, Record<string, any> {}

export function Strong({
  children,
  node,
  ...props
}: PropsWithChildren<StrongProps>) {
  return (
    <InternalStrong variation="bold" {...props}>
      {children}
    </InternalStrong>
  );
}
