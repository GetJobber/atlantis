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

interface TextProps
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
   * This will make the text inaccessible to the screen reader.
   * This should be avoided unless there is a good reason.
   * For example this is used in InputText to make it so the label isn't
   * selectable because it is already read from the accessibilityLabel
   * of the TextInput
   */
  readonly hideFromScreenReader?: boolean;
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
const maxScaledFontSize: Record<TextLevel, number> = {
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
  hideFromScreenReader = false,
  maxFontScaleSize,
  selectable,
}: TextProps): JSX.Element {
  const accessibilityRole: TextAccessibilityRole = "text";

  return (
    <Typography
      color={variation}
      fontFamily="base"
      fontStyle="regular"
      fontWeight={getFontWeight({ level, emphasis })}
      maxFontScaleSize={maxFontScaleSize || maxScaledFontSize[level]}
      selectable={selectable}
      {...{
        ...levelStyles[level],
        allowFontScaling,
        align,
        adjustsFontSizeToFit,
        accessibilityRole,
        reverseTheme,
        maxLines,
        strikeThrough,
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
