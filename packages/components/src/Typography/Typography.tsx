import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Typography.css";
import fontSizes from "./FontSizes.css";
import fontWeights from "./FontWeights.css";
import textCases from "./TextCases.css";

interface TypographyProps {
  /**
   * @default "p"
   */
  readonly element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  /**
   * @default "base"
   */
  readonly size?: keyof typeof fontSizes;
  /**
   * @default "regular"
   */
  readonly fontWeight?: keyof typeof fontWeights;
  readonly textCase?: keyof typeof textCases;
  readonly children: ReactNode;
}

export function Typography({
  children,
  element = "p",
  size = "base",
  fontWeight = "regular",
  textCase,
}: TypographyProps) {
  const className = classnames(
    styles.base,
    size && fontSizes[size],
    fontWeight && fontWeights[fontWeight],
    textCase && textCases[textCase],
  );

  const Tag = element;

  return <Tag className={className}>{children}</Tag>;
}
