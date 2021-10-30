import React, { PropsWithChildren } from "react";
import { Text } from "../../Text";
import { BaseElementProps } from "../BaseElementProps";

interface ParagraphProps extends BaseElementProps, Record<string, any> {}

export function Paragraph({
  children,
  ...props
}: PropsWithChildren<ParagraphProps>) {
  return <Text {...props}>{children}</Text>;
}
