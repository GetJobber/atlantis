import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  numberOfLines?: number;
  readonly variation?:
    | "default"
    | "subdued"
    | "intro"
    | "success"
    | "error"
    | "warn"
    | "info";
  readonly children: ReactNode;
}

export interface VariationMap {
  [variation: string]: TypographyOptions;
}

export function Text({
  variation = "default",
  children,
  numberOfLines,
}: TextProps) {
  const variationMap: VariationMap = {
    default: { textColor: "greyBlueDark", size: "base" },
    subdued: { textColor: "greyBlue", size: "base" },
    intro: { textColor: "greyBlueDark", size: "larger" },
    success: { textColor: "green", size: "base" },
    error: { textColor: "red", size: "base" },
    warn: { textColor: "yellowDark", size: "base" },
    info: { textColor: "lightBlue", size: "base" },
  };

  const selectedVariation = variationMap[variation];
  if (numberOfLines) {
    selectedVariation.numberOfLines = numberOfLines;
  }

  return <Typography {...selectedVariation}>{children}</Typography>;
}
