import React, { ReactNode } from "react";
import { Typography, TypographyOptions } from "../Typography";
import { useAtlantisConfig } from "../utils/useAtlantisConfig";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  /**
   * @default 5
   */
  readonly level: HeadingLevel;
  readonly children: ReactNode;
}

export type LevelMap = Record<HeadingLevel, TypographyOptions>;

export function Heading({ level = 5, children }: HeadingProps) {
  const { JOBBER_RETHEME: inRetheme } = useAtlantisConfig();

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
