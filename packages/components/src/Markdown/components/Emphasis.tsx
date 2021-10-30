import React, { PropsWithChildren } from "react";
import { Emphasis as InternalEmphasis } from "../../Emphasis";
import { BaseElementProps } from "../BaseElementProps";

interface EmphasisProps extends BaseElementProps, Record<string, any> {}

export function Emphasis({
  children,
  node,
  ...props
}: PropsWithChildren<EmphasisProps>) {
  return (
    <InternalEmphasis variation="highlight" {...props}>
      {children}
    </InternalEmphasis>
  );
}
