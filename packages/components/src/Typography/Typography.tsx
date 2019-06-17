import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Typography.css";
import fontSizes from "./FontSizes.css";
import textCases from "./TextCases.css";

interface TypographyProps {
  /**
   *
   * @default "p"
   */
  readonly element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  readonly size?: keyof typeof fontSizes;
  readonly textCase?: "uppercase" | "lowercase" | "capitalize";
  readonly children: ReactNode;
}

export function Typography({
  children,
  element = "p",
  size,
  textCase,
}: TypographyProps) {
  const className = classnames(
    styles.base,
    size && fontSizes[size],
    textCase && textCases[textCase],
  );
  const Tag = element;

  return <Tag className={className}>{children}</Tag>;
}
