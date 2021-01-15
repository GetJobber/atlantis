import React, { PropsWithChildren } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  readonly variation?:
    | "default"
    | "subdued"
    | "success"
    | "error"
    | "warn"
    | "info";

  readonly size?: "small" | "base" | "large";
}

type TextColor = Extract<TypographyOptions, "textColor">;

export function Text({
  variation = "default",
  size = "base",
  children,
}: PropsWithChildren<TextProps>) {
  const textColors = {
    default: "greyBlueDark",
    subdued: "greyBlue",
    success: "green",
    error: "red",
    warn: "yellowDark",
    info: "lightBlue",
  };

  return (
    <Typography textColor={textColors[variation] as TextColor} size={size}>
      {children}
    </Typography>
  );
}
