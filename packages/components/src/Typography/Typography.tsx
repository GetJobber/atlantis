import type { CSSProperties, ReactNode } from "react";
import React from "react";
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
import type { UnderlineStyle, UnderlineStyleWithColor } from "./types";

export interface TypographyProps {
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
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: { textStyle?: string };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: { textStyle?: CSSProperties };
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
  UNSAFE_className,
  UNSAFE_style,
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
    {
      ...(align && { [alignment[align]]: align !== `start` }),
    },
    UNSAFE_className?.textStyle,
  );

  const truncateStyles: CSSProperties = shouldTruncateText
    ? {
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: "vertical",
      }
    : {};

  const underlineInlineStyles = computeUnderlineStyles(underline, textColor);

  return (
    <Tag
      id={id}
      className={className}
      style={{
        ...truncateStyles,
        ...underlineInlineStyles,
        ...UNSAFE_style?.textStyle,
      }}
    >
      {children}
    </Tag>
  );
}

function computeUnderlineStyles(
  underline?: UnderlineStyle | UnderlineStyleWithColor,
  textColor?: keyof typeof textColors,
): CSSProperties {
  if (!underline) {
    return {};
  }

  const [underlineStyle, underlineColor] = underline.split(" ");
  const underlineInlineStyles: CSSProperties = {
    textDecorationStyle: underlineStyle as UnderlineStyle,
  };

  if (underlineColor) {
    underlineInlineStyles.textDecorationColor = `var(--${underlineColor})`;
  } else if (textColor) {
    underlineInlineStyles.textDecorationColor = textColors[textColor];
  }

  return underlineInlineStyles;
}
