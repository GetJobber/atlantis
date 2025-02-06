import React from "react";
import {
  BaseWeight,
  LineHeight,
  TextAccessibilityRole,
  TextAlign,
  TextSize,
  TextVariation,
  TruncateLength,
  Typography,
  TypographyProps,
} from "../Typography";
import { tokens } from "../utils/design";
import { TypographyUnsafeStyle } from "../Typography/Typography";

export interface TextProps
  extends Pick<TypographyProps<"base">, "maxFontScaleSize" | "selectable"> {
  /**
   * Visual hierarchy of the text
   */
  readonly level?: TextLevel;

  /**
   * Color variation of text
   */
  readonly variation?: TextVariation;

  /**
   * Change the appearance of the text
   */
  readonly emphasis?: "strong";

  /**
   * Allow text to be resized based on user's device display scale
   */
  readonly allowFontScaling?: boolean;

  /**
   * Determines whether text should be scaled down to fit based on maxLines prop
   */
  readonly adjustsFontSizeToFit?: boolean;

  /**
   * The maximum amount of lines the text can occupy before being truncated with "...".
   * Uses predefined string values that correspond to a doubling scale for the amount of lines.
   */
  readonly maxLines?: TruncateLength;

  /**
   * Alignment of text
   */
  readonly align?: TextAlign;

  /**
   * Text to display
   */
  readonly children?: string;

  /**
   * Reverse theme for better display on dark background
   */
  readonly reverseTheme?: boolean;

  /**
   * Have text styled with strike through
   */
  readonly strikeThrough?: boolean;

  /**
   * Use italic font style
   */
  readonly italic?: boolean;

  /**
   * Underline style to use for the text. The non-solid style is only supported
   * on iOS, as per React Native's Text component's limitations.
   * https://reactnative.dev/docs/text-style-props#textdecorationstyle-ios
   */
  readonly underline?: "solid" | "dotted";

  /**
   * This will make the text inaccessible to the screen reader.
   * This should be avoided unless there is a good reason.
   * For example this is used in InputText to make it so the label isn't
   * selectable because it is already read from the accessibilityLabel
   * of the TextInput
   */
  readonly hideFromScreenReader?: boolean;

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information [here](https://atlantis.getjobber.com/storybook/?path=/docs/guides-customizing-components--docs#unsafe_-props).
   */
  readonly UNSAFE_style?: TypographyUnsafeStyle;
}

export type TextLevel = "text" | "textSupporting";

interface LevelStyle {
  readonly size: TextSize;
  readonly lineHeight: LineHeight;
}

const levelStyles: Record<TextLevel, LevelStyle> = {
  text: {
    size: "default",
    lineHeight: "base",
  },
  textSupporting: {
    size: "small",
    lineHeight: "tight",
  },
};

const MAX_TEXT_FONT_SIZE_SCALE = 50;
export const TEXT_MAX_SCALED_FONT_SIZES: Record<TextLevel, number> = {
  text: MAX_TEXT_FONT_SIZE_SCALE,
  textSupporting: tokens["typography--fontSize-base"],
};

export function Text({
  level = "text",
  variation = "base",
  emphasis,
  allowFontScaling = true,
  adjustsFontSizeToFit = false,
  maxLines = "unlimited",
  align,
  children,
  reverseTheme = false,
  strikeThrough = false,
  italic = false,
  hideFromScreenReader = false,
  maxFontScaleSize,
  UNSAFE_style,
  underline,
  selectable,
}: TextProps): JSX.Element {
  const accessibilityRole: TextAccessibilityRole = "text";

  return (
    <Typography
      color={variation}
      UNSAFE_style={UNSAFE_style}
      fontFamily="base"
      fontStyle={italic ? "italic" : "regular"}
      fontWeight={getFontWeight({ level, emphasis })}
      maxFontScaleSize={maxFontScaleSize || TEXT_MAX_SCALED_FONT_SIZES[level]}
      selectable={selectable}
      underline={underline}
      {...{
        ...levelStyles[level],
        allowFontScaling,
        align,
        adjustsFontSizeToFit,
        accessibilityRole,
        reverseTheme,
        maxLines,
        strikeThrough,
        italic,
        hideFromScreenReader,
      }}
    >
      {children}
    </Typography>
  );
}

function getFontWeight({
  level,
  emphasis,
}: Pick<TextProps, "level" | "emphasis">): BaseWeight {
  if (emphasis === "strong") return "semiBold";
  if (level === "textSupporting") return "medium";

  return "regular";
}
