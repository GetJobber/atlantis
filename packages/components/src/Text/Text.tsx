import React, { PropsWithChildren } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  readonly maxLines?:
    | "single"
    | "small"
    | "base"
    | "large"
    | "larger"
    | "unlimited";

  readonly variation?:
    | "default"
    | "subdued"
    | "success"
    | "error"
    | "warn"
    | "info"
    | "disabled";

  readonly align?: "start" | "center" | "end";

  readonly size?: "small" | "base" | "large";
}

type TextColor = Extract<TypographyOptions, "textColor">;

export function Text({
  variation = "default",
  size = "base",
  align = "start",
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
    disabled: "disabled",
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
      align={align}
    >
      {children}
    </Typography>
  );
}
