import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "../Typography";

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

interface VariationMap {
  [variation: string]: Omit<TypographyProps, "children">;
}

export function Text({ variation = "default", children }: TextProps) {
  const variationMap: VariationMap = {
    default: { size: "base" },
    subdued: { textColor: "greyBlue", size: "base" },
    intro: { size: "larger" },
    success: { textColor: "green", size: "base" },
    error: { textColor: "red", size: "base" },
    warning: { textColor: "yellow", size: "base" },
    info: { textColor: "lightBlue", size: "base" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
