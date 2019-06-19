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
    | "subhead"
    | "default";
  readonly children: ReactNode;
}

interface VariationMap {
  [variation: string]: Omit<TypographyProps, "children">;
}

export function Text({ variation = "default", children }: TextProps) {
  const variationMap: VariationMap = {
    default: {},
    subdued: { textColor: "greyBlue" },
    success: { textColor: "green" },
    error: { textColor: "red" },
    warning: { textColor: "yellow" },
    info: { textColor: "blue" },
    button: {
      textColor: "green",
      textCase: "uppercase",
      fontWeight: "extraBold",
      size: "small",
    },
    subhead: { size: "larger" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
