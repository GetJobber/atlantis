import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "../Typography";

interface EmphasisProps {
  variation: "bold" | "italic" | "highlight";
  children: ReactNode;
}

interface VariationMap {
  [variation: string]: Omit<TypographyProps, "children">;
}

export function Emphasis({ variation, children }: EmphasisProps) {
  const variationMap: VariationMap = {
    bold: { element: "b", fontWeight: "bold" },
    italic: { element: "em", emphasisType: "italic" },
    highlight: { element: "strong", emphasisType: "highlight" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
