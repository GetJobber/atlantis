import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface TextProps {
  readonly variation?:
    | "default"
    | "subdued"
    | "intro"
    | "success"
    | "error"
    | "warning"
    | "info";
  readonly children: ReactNode;
}

export interface VariationMap {
  [variation: string]: TypographyOptions;
}

export function Text({ variation = "default", children }: TextProps) {
  const variationMap: VariationMap = {
    default: { textColor: "greyBlueDark", size: "base" },
    subdued: { textColor: "greyBlue", size: "base" },
    intro: { textColor: "greyBlueDark", size: "larger" },
    success: { textColor: "green", size: "base" },
    error: { textColor: "red", size: "base" },
    warning: { textColor: "yellow", size: "base" },
    info: { textColor: "lightBlue", size: "base" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
