import React, { PropsWithChildren } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  maxLines?: "single" | "small" | "base" | "large" | "larger" | "unlimited";

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
  maxLines = "unlimited",
}: PropsWithChildren<TextProps>) {
  const textColors = {
    default: "text",
    subdued: "textSecondary",
    success: "success",
    error: "critical",
    warn: "warning",
    info: "informative",
  };

  const maxLineToNumber = {
    single: 1,
    small: 2,
    base: 4,
    large: 8,
    larger: 16,
    unlimited: undefined,
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
