import React, { PropsWithChildren } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  readonly variation?:
    | "default"
    | "subdued"
    | "success"
    | "error"
    | "warn"
    | "info"
    | "disabled";

  readonly size?: "small" | "base" | "large";
}

type TextColor = Extract<TypographyOptions, "textColor">;

export function Text({
  variation = "default",
  size = "base",
  children,
}: PropsWithChildren<TextProps>) {
  const textColors = {
    default: "blue",
    subdued: "greyBlue",
    success: "green",
    error: "error",
    warn: "yellowDark",
    info: "lightBlue",
    disabled: "disabled",
  };

  return (
    <Typography textColor={textColors[variation] as TextColor} size={size}>
      {children}
    </Typography>
  );
}
