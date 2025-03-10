import React, { PropsWithChildren } from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Text, TextProps } from "../Text";

export function InputFileHintText({
  size = "small",
  children,
  ...textProps
}: PropsWithChildren<TextProps>) {
  const { hintText, fileType, allowMultiple } = useInputFileContentContext();

  return (
    <Text {...textProps} size={size}>
      {children || hintText || getDefaultHintText(fileType, allowMultiple)}
    </Text>
  );
}

function getDefaultHintText(fileType: string, multiple: boolean) {
  const fileTypeDeterminer = fileType === "Image" ? "an" : "a";
  const hintText = multiple
    ? `Select or drag ${fileType.toLowerCase()}s here to upload`
    : `Select or drag ${fileTypeDeterminer} ${fileType.toLowerCase()} here to upload`;

  return hintText;
}
