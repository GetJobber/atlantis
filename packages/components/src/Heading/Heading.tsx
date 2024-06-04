import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  /**
   * @default 5
   */
  readonly level: HeadingLevel;
  readonly children: ReactNode;
  /**
   * Allows overriding of the element rendered. Defaults to the heading specified with level.
   */
  readonly element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export type LevelMap = Record<HeadingLevel, TypographyOptions>;

export function Heading({ level = 5, children, element }: HeadingProps) {
  const levelMap: LevelMap = {
    1: {
      element: "h1",
      size: "jumbo",
      fontWeight: "black",
      textColor: "heading",
    },
    2: {
      element: "h2",
      size: "largest",
      fontWeight: "bold",
      textColor: "heading",
    },
    3: {
      element: "h3",
      size: "larger",
      fontWeight: "bold",
      textColor: "heading",
    },
    4: {
      element: "h4",
      size: "large",
      fontWeight: "bold",
      textColor: "heading",
    },
    5: {
      element: "h5",
      size: "base",
      fontWeight: "bold",
      textColor: "heading",
    },
    6: {
      element: "h6",
      size: "small",
      textCase: "uppercase",
      fontWeight: "bold",
      textColor: "heading",
    },
  };

  return (
    <Typography
      {...levelMap[level]}
      element={element || levelMap[level].element}
    >
      {children}
    </Typography>
  );
}
