/* eslint-disable import/no-internal-modules */
import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./css/Typography.css";
import fontSizes from "./css/FontSizes.css";
import fontWeights from "./css/FontWeights.css";
import textCases from "./css/TextCases.css";
import textColors from "./css/TextColors.css";

export interface TypographyProps {
  /**
   * @default "p"
   */
  readonly element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  /**
   * @default "base"
   */
  readonly size?: keyof typeof fontSizes;
  /**
   * @default "regular"
   */
  readonly fontWeight?: keyof typeof fontWeights;
  readonly textCase?: keyof typeof textCases;
  readonly textColor?: keyof typeof textColors;
  readonly children: ReactNode;
}

export function Typography({
  children,
  element = "p",
  size = "base",
  fontWeight = "regular",
  textCase,
  textColor,
}: TypographyProps) {
  const className = classnames(
    styles.base,
    size && fontSizes[size],
    fontWeight && fontWeights[fontWeight],
    textCase && textCases[textCase],
    textColor && textColors[textColor],
  );

  const Tag = element;

  return <Tag className={className}>{children}</Tag>;
}
