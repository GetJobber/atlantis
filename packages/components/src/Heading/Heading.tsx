import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface HeadingProps {
  /**
   * @default 5
   */
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly children: ReactNode;
}

export interface LevelMap {
  [level: string]: TypographyOptions;
}

export function Heading({ level = 5, children }: HeadingProps) {
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
      fontWeight: "black",
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

  return <Typography {...levelMap[level]}>{children}</Typography>;
}
