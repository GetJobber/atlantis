import type { PropsWithChildren } from "react";
import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import type { TextProps } from "../Text";
import { Text } from "../Text";

export function InputFileHintText({
  size = "small",
  children,
  ...textProps
}: PropsWithChildren<TextProps>) {
  const { hintText } = useInputFileContentContext();

  return (
    <Text {...textProps} size={size}>
      {children || hintText}
    </Text>
  );
}
