import React, { PropsWithChildren } from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Text, TextProps } from "../Text";

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
