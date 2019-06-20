import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "../Typography";

interface EmphasisProps {
  variation: "bold" | "italic" | "underline" | "highlight";
  children: ReactNode;
}

interface VariationMap {
  [variation: string]: Omit<TypographyProps, "children">;
}

export function Emphasis({ variation, children }: EmphasisProps) {
  const variationMap: VariationMap = {
    bold: { fontWeight: "bold" },
    italic: { emphasisType: "italic" },
    underline: { emphasisType: "underline" },
    highlight: { emphasisType: "highlight" },
  };

  return (
    <Typography {...variationMap[variation]} element="span">
      {children}
    </Typography>
  );
}
