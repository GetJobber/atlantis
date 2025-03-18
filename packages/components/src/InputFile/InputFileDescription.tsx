import React, { PropsWithChildren } from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Text, TextProps } from "../Text";

export function InputFileDescription({
  size = "small",
  variation = "subdued",
  children,
  ...textProps
}: PropsWithChildren<TextProps>) {
  const { description } = useInputFileContentContext();

  if (!children && !description) {
    return null;
  }

  return (
    <Text size={size} variation={variation} {...textProps}>
      {children || description}
    </Text>
  );
}
