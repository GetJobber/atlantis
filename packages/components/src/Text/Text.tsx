import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "../Typography";

interface TextProps {
  readonly variation?:
    | "subdued"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "button"
    | "intro"
    | "default";
  readonly children: ReactNode;
}

interface VariationMap {
  [variation: string]: Omit<TypographyProps, "children">;
}

export function Text({ variation = "default", children }: TextProps) {
  const variationMap: VariationMap = {
    default: { size: "base" },
    subdued: { textColor: "greyBlue", size: "base" },
    success: { textColor: "green", size: "base" },
    error: { textColor: "red", size: "base" },
    warning: { textColor: "yellow", size: "base" },
    info: { textColor: "lightBlue", size: "base" },
    button: {
      textColor: "green",
      textCase: "uppercase",
      fontWeight: "extraBold",
      size: "small",
    },
    intro: { size: "larger" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
