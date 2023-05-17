import React from "react";
import {
  FontFamily,
  TextAlign,
  TextColor,
  TruncateLength,
  Typography,
  TypographyProps,
} from "../Typography";
import { tokens } from "../utils/design";

type HeadingStyle = Pick<
  TypographyProps<FontFamily>,
  "fontFamily" | "fontWeight" | "size" | "lineHeight" | "color"
>;
type HeadingColor = Extract<TextColor, "text" | "subdued" | "heading">;
export type HeadingLevel = "title" | "subtitle" | "heading" | "subHeading";

interface HeadingProps<T extends HeadingLevel>
  extends Pick<TypographyProps<"base">, "selectable"> {
  /**
   * Text to display.
   */
  readonly children: string;

  /**
   * The type of heading, e.g., "Title"
   */
  readonly level?: T;

  /**
   * The text color of heading
   */
  readonly variation?: HeadingColor;

  /**
   * Uses the reverse variant of the text color for the heading
   */
  readonly reverseTheme?: boolean;

  /**
   * Alignment of heading
   */
  readonly align?: TextAlign;

  /**
   * The maximum amount of lines the text can occupy before being truncated with "...".
   * Uses predefined string values that correspond to a doubling scale for the amount of lines.
   */
  readonly maxLines?: TruncateLength;

  /**
   * Allow text to be resized based on user's device display scale
   */
  readonly allowFontScaling?: boolean;
}

const maxScaledFontSize: Record<HeadingLevel, number> = {
  subHeading: tokens["typography--fontSize-base"] * 1.375,
  heading: tokens["typography--fontSize-base"] * 1.5,
  subtitle: tokens["typography--fontSize-base"] * 1.5,
  title: tokens["typography--fontSize-base"] * 2.125,
};

export function Heading<T extends HeadingLevel = "heading">({
  children,
  level,
  variation = "heading",
  reverseTheme = false,
  align,
  maxLines = "unlimited",
  allowFontScaling = true,
  selectable,
}: HeadingProps<T>): JSX.Element {
  const headingStyle = getHeadingStyle(level, variation);
  const accessibilityRole = "header";

  return (
    <Typography
      {...{
        ...headingStyle,
        accessibilityRole,
        reverseTheme,
        align,
        maxLines,
        allowFontScaling,
      }}
      maxFontScaleSize={maxScaledFontSize[level as HeadingLevel]}
      selectable={selectable}
    >
      {children}
    </Typography>
  );
}

function getHeadingStyle(
  level: HeadingLevel = "heading",
  variation: HeadingColor,
): HeadingStyle {
  const headingLevelToStyle: Record<HeadingLevel, HeadingStyle> = {
    title: {
      fontFamily: "display",
      fontWeight: "black",
      size: "jumbo",
      lineHeight: "jumbo",
      color: variation,
    },
    subtitle: {
      fontFamily: "display",
      fontWeight: "extraBold",
      size: "largest",
      lineHeight: "largest",
      color: variation,
    },
    heading: {
      fontFamily: "display",
      fontWeight: "extraBold",
      size: "larger",
      lineHeight: "large",
      color: variation,
    },
    subHeading: {
      fontFamily: "base",
      fontWeight: "semiBold",
      size: "default",
      lineHeight: "base",
      color: variation,
    },
  };

  return headingLevelToStyle[level];
}
