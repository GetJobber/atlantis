/* eslint-disable import/no-internal-modules */
import React, { CSSProperties, ReactNode } from "react";
import classnames from "classnames";
import styles from "./css/Typography.css";
import fontSizes from "./css/FontSizes.css";
import fontWeights from "./css/FontWeights.css";
import textCases from "./css/TextCases.css";
import textColors from "./css/TextColors.css";
import emphasis from "./css/Emphasis.css";
import truncate from "./css/Truncate.css";

interface TypographyProps {
  readonly id?: string;
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
    | "dd"
    | "dt"
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
  numberOfLines?: number;
}
export type TypographyOptions = Omit<TypographyProps, "children">;

export function Typography({
  id,
  children,
  element: Tag = "p",
  size,
  fontWeight = "regular",
  textCase,
  textColor,
  emphasisType,
  numberOfLines,
}: TypographyProps) {
  const shouldTruncateText = numberOfLines && numberOfLines > 0;
  const className = classnames(
    styles.base,
    fontWeights[fontWeight],
    size && fontSizes[size],
    textCase && textCases[textCase],
    textColor && textColors[textColor],
    emphasisType && emphasis[emphasisType],
    shouldTruncateText && truncate.textTruncate,
  );

  let truncateLines: CSSProperties | undefined;
  if (shouldTruncateText) {
    truncateLines = {
      WebkitLineClamp: numberOfLines,
      WebkitBoxOrient: "vertical",
    };
  }

  return (
    <Tag id={id} className={className} style={truncateLines}>
      {children}
    </Tag>
  );
}
