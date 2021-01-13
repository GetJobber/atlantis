import React, { PropsWithChildren } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  maxLines?: "single" | "small" | "base" | "large" | "larger";
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
  maxLines = "base",
}: PropsWithChildren<TextProps>) {
  const textColors = {
    default: "greyBlueDark",
    subdued: "greyBlue",
    success: "green",
    error: "red",
    warn: "yellowDark",
    info: "lightBlue",
  };

  const maxLineToNumber = {
    single: 1,
    small: 2,
    base: undefined,
    large: 8,
    larger: 16,
  };

  return (
    <Typography
      textColor={textColors[variation] as TextColor}
      size={size}
      numberOfLines={maxLineToNumber[maxLines]}
    >
      {children}
    </Typography>
  );
}
