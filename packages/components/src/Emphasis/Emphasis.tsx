import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface EmphasisProps {
  readonly variation: "bold" | "italic" | "highlight";
  readonly children: ReactNode;
}

export interface VariationMap {
  [variation: string]: TypographyOptions;
}

export function Emphasis({ variation, children }: EmphasisProps) {
  const variationMap: VariationMap = {
    bold: { element: "b", fontWeight: "bold" },
    italic: { element: "em", emphasisType: "italic" },
    highlight: { element: "strong", emphasisType: "highlight" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
