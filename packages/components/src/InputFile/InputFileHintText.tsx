import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Typography } from "../Typography";

export function InputFileHintText({
  fileType: fileTypeProp,
  allowMultiple: allowMultipleProp,
  children,
}: {
  readonly fileType?: string;
  readonly allowMultiple?: boolean;
  readonly children?: React.ReactNode;
}) {
  const contextValues = useInputFileContentContext();

  const fileType = fileTypeProp ?? contextValues.fileType;
  const allowMultiple = allowMultipleProp ?? contextValues.allowMultiple;

  return (
    <Typography size="small">
      {children || (fileType && getHintText(fileType, allowMultiple))}
    </Typography>
  );
}

function getHintText(fileType: string, multiple: boolean) {
  const fileTypeDeterminer = fileType === "Image" ? "an" : "a";
  const hintText = multiple
    ? `Select or drag ${fileType.toLowerCase()}s here to upload`
    : `Select or drag ${fileTypeDeterminer} ${fileType.toLowerCase()} here to upload`;

  return hintText;
}
