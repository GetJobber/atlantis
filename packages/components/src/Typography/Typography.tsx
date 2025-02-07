import React, { CSSProperties, ReactNode } from "react";
import classnames from "classnames";
import styles from "./css/Typography.module.css";
import fontSizes from "./css/FontSizes.module.css";
import fontWeights from "./css/FontWeights.module.css";
import textCases from "./css/TextCases.module.css";
import textColors from "./css/TextColors.module.css";
import emphasis from "./css/Emphasis.module.css";
import truncate from "./css/Truncate.module.css";
import alignment from "./css/TextAlignment.module.css";
import fontFamilies from "./css/FontFamilies.module.css";
import underlineStyles from "./css/Underline.module.css";
import strikethroughStyles from "./css/Strikethrough.module.css";
import {
  StrikethroughStyle,
  StrikethroughStyleWithColor,
  UnderlineStyle,
  UnderlineStyleWithColor,
} from "./types";

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
  /**
   * Sets the alignment to start, center, or end.
   * In LTR scripts this equates to left, center, or right.
   * @default "start"
   */
  readonly align?: keyof typeof alignment;
  readonly fontFamily?: keyof typeof fontFamilies;
  readonly children: ReactNode;
  readonly numberOfLines?: number;

  /**
   * The style (and optionally a color) of underline the text is decorated with.
   * All semantic color tokens (other than the base values) defined in tokens.web
   * are valid values. If omitted, no underline is applied.
   *
   * @example "solid" for a non-dashed underline of the same color as `textColor`
   * @example "double color-invoice" for a double underline in the specified color
   */
  readonly underline?: UnderlineStyle | UnderlineStyleWithColor | undefined;
  /**
   * The style (and optionally a color) of strikethrough the text is decorated with.
   * All semantic color tokens (other than the base values) defined in tokens.web
   * are valid values. If omitted, no strikethrough is applied.
   */
  readonly strikethrough?:
    | StrikethroughStyle
    | StrikethroughStyleWithColor
    | undefined;
}
export type TypographyOptions = Omit<TypographyProps, "children">;

export function Typography({
  id,
  children,
  element: Tag = "p",
  size,
  align,
  fontWeight = "regular",
  textCase,
  textColor,
  emphasisType,
  numberOfLines,
  fontFamily,
  underline,
  strikethrough,
}: TypographyProps) {
  const shouldTruncateText = numberOfLines && numberOfLines > 0;
  const className = classnames(
    styles.base,
    fontWeights[fontWeight],
    size && fontSizes[size],
    textCase && textCases[textCase],
    textColor && textColors[textColor],
    emphasisType && emphasis[emphasisType],
    fontFamily && fontFamilies[fontFamily],
    shouldTruncateText && truncate.textTruncate,
    underline && underlineStyles.basicUnderline,
    strikethrough && strikethroughStyles.basicStrikethrough,
    {
      ...(align && { [alignment[align]]: align !== `start` }),
    },
  );

  let stylesOverrides: CSSProperties = {};

  if (shouldTruncateText) {
    stylesOverrides = {
      WebkitLineClamp: numberOfLines,
      WebkitBoxOrient: "vertical",
    };
  }

  if (strikethrough || underline) {
    const decoration = strikethrough || underline;
    applyTextDecoration(decoration, stylesOverrides, textColor);
  }

  return (
    <Tag id={id} className={className} style={stylesOverrides}>
      {children}
    </Tag>
  );
}

function applyTextDecoration(
  decoration: string,
  stylesOverrides: CSSProperties,
  textColor?: keyof typeof textColors,
) {
  const [decorationStyle, decorationColor] = decoration.split(" ");

  stylesOverrides.textDecorationStyle =
    decoration === "underline"
      ? (decorationStyle as UnderlineStyle)
      : (decorationStyle as StrikethroughStyle);
  stylesOverrides.textDecorationColor = computeDecoratorColor(
    decorationColor,
    textColor,
  );
}

function computeDecoratorColor(
  textDecorationColor: string,
  textColor?: keyof typeof textColors,
): string | undefined {
  // Use the specified color if one is provided. If no color
  // is specified, fall back to the text color for the decoration.
  if (textDecorationColor) {
    return `var(--${textDecorationColor})`;
  }

  if (textColor) {
    return textColors[textColor];
  }
}
