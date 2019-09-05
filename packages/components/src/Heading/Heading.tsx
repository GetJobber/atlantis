import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";

interface HeadingProps {
  /**
   * @default 5
   */
  readonly level: 1 | 2 | 3 | 4 | 5;
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
      textCase: "uppercase",
      fontWeight: "black",
      textColor: "blue",
    },
    2: {
      element: "h2",
      size: "largest",
      textCase: "uppercase",
      fontWeight: "black",
      textColor: "blue",
    },
    3: {
      element: "h3",
      size: "larger",
      fontWeight: "bold",
      textColor: "blue",
    },
    4: {
      element: "h4",
      size: "large",
      fontWeight: "bold",
      textColor: "blue",
    },
    5: {
      element: "h5",
      size: "base",
      fontWeight: "bold",
      textColor: "blue",
    },
  };

  return <Typography {...levelMap[level]}>{children}</Typography>;
}
