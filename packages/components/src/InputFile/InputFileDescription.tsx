import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Typography } from "../Typography";

export function InputFileDescription({
  children,
}: {
  readonly children?: React.ReactNode;
}) {
  const { description } = useInputFileContentContext();

  return <Typography size="small">{children || description}</Typography>;
}
