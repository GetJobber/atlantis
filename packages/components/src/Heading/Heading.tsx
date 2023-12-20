import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";
import { getAtlantisConfig } from "../utils/getAtlantisConfig";

interface HeadingProps {
  /**
   * @default 5
   */
  readonly level: 1 | 2 | 3 | 4 | 5 | 6 | "extra";
  readonly children: ReactNode;
}

export interface LevelMap {
  [level: string]: TypographyOptions;
}

export function Heading({ level = 5, children }: HeadingProps) {
  const config = getAtlantisConfig();
  const inRetheme = config?.JOBBER_RETHEME;

  const levelMap: LevelMap = {
    1: {
      element: "h1",
      size: "jumbo",
      fontWeight: inRetheme ? "extraBold" : "black",
      textColor: "heading",
    },
    2: {
      element: "h2",
      size: "largest",
      fontWeight: inRetheme ? "bold" : "black",
      textColor: "heading",
    },
    3: {
      element: "h3",
      size: "larger",
      fontWeight: inRetheme ? "bold" : "extraBold",
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
      fontWeight: inRetheme ? "semiBold" : "bold",
      textColor: "heading",
    },
  };

  return <Typography {...levelMap[level]}>{children}</Typography>;
}
