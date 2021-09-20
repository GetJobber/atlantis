import React from "react";
import { ChipProps } from "./ChipProps";
import { Typography } from "../Typography";

type ChipLabelProps = Pick<ChipProps, "active" | "label">;

export function ChipLabel({ active, label }: ChipLabelProps) {
  const textColor = active ? "textReverse" : "textSecondary";

  return (
    <Typography element="span" size="base" textColor={textColor}>
      {label}
    </Typography>
  );
}
