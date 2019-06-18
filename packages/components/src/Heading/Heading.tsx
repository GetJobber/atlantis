import React, { ReactNode } from "react";
import { Typography } from "../Typography";

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

export function Heading({ variation = "section", children }: HeadingProps) {
  switch (variation) {
    case "page":
      return (
        <Typography
          element="h1"
          size="jumbo"
          textCase="uppercase"
          fontWeight="black"
        >
          {children}
        </Typography>
      );
    case "subtitle":
      return (
        <Typography
          element="h2"
          size="largest"
          textCase="uppercase"
          fontWeight="black"
        >
          {children}
        </Typography>
      );
    case "content":
      return (
        <Typography element="h3" size="larger" fontWeight="bold">
          {children}
        </Typography>
      );
    case "section":
      return (
        <Typography element="h4" size="large" fontWeight="bold">
          {children}
        </Typography>
      );
    case "subsection":
      return (
        <Typography element="h5" size="base" fontWeight="bold">
          {children}
        </Typography>
      );
    case "overline":
      return (
        <Typography
          element="h6"
          size="small"
          textCase="uppercase"
          fontWeight="bold"
        >
          {children}
        </Typography>
      );
  }
}
