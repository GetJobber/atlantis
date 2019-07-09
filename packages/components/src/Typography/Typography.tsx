/* eslint-disable import/no-internal-modules */
import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./css/Typography.css";
import fontSizes from "./css/FontSizes.css";
import fontWeights from "./css/FontWeights.css";
import textCases from "./css/TextCases.css";
import textColors from "./css/TextColors.css";
import emphasis from "./css/Emphasis.css";

interface TypographyProps {
  /**
   * @default "p"
   */
  readonly element?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "b"
    | "em"
    | "strong"
    | "span";
  readonly size?: keyof typeof fontSizes;
  /**
   * Aside from changing the font weights, this also changes the font family.
   * Source sans for `regular` and `bold`.
   * Poppins for `extraBold` and `black`.
   * @default "regular"
   */
  readonly fontWeight?: keyof typeof fontWeights;
  readonly textCase?: keyof typeof textCases;
  readonly textColor?: keyof typeof textColors;
  readonly emphasisType?: keyof typeof emphasis;
  readonly children: ReactNode;
}
export type TypographyOptions = Omit<TypographyProps, "children">;

export function Typography({
  children,
  element: Tag = "p",
  size,
  fontWeight,
  textCase,
  textColor,
  emphasisType,
}: TypographyProps) {
  const className = classnames(
    styles.base,
    size && fontSizes[size],
    fontWeight && fontWeights[fontWeight],
    textCase && textCases[textCase],
    textColor && textColors[textColor],
    emphasisType && emphasis[emphasisType],
  );

  return <Tag className={className}>{children}</Tag>;
}
