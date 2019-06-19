import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "../Typography";

interface HeadingProps {
  /**
   * @default "section"
   */
  readonly variation:
    | "page"
    | "subtitle"
    | "content"
    | "section"
    | "subsection"
    | "overline";
  readonly children: ReactNode;
}

interface VariationMap {
  [variation: string]: Omit<TypographyProps, "children">;
}

export function Heading({ variation = "section", children }: HeadingProps) {
  const variationMap: VariationMap = {
    page: {
      element: "h1",
      size: "jumbo",
      textCase: "uppercase",
      fontWeight: "black",
    },
    subtitle: {
      element: "h2",
      size: "largest",
      textCase: "uppercase",
      fontWeight: "black",
    },
    content: { element: "h3", size: "larger", fontWeight: "bold" },
    section: { element: "h4", size: "large", fontWeight: "bold" },
    subsection: { element: "h5", size: "base", fontWeight: "bold" },
    overline: {
      element: "h6",
      size: "small",
      textCase: "uppercase",
      fontWeight: "bold",
    },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}
