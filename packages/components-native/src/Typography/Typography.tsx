import React from "react";
import {
  AccessibilityProps,
  I18nManager,
  StyleProp,
  StyleSheet,
  // eslint-disable-next-line no-restricted-imports
  Text,
  TextProps,
  ViewStyle,
} from "react-native";
import { styles } from "./Typography.style";
import { TypographyGestureDetector } from "./TypographyGestureDetector";
import { tokens } from "../utils/design";
import { capitalize } from "../utils/intl";

export interface TypographyProps<T extends FontFamily>
  extends Pick<TextProps, "selectable"> {
  /**
   * Text capitalization
   */
  readonly transform?: TextTransform;

  /**
   * Color of text
   */
  readonly color?: TextColor;

  /**
   * Alignment of text
   */
  readonly align?: TextAlign;

  /**
   * Font size
   */
  readonly size?: TextSize;

  /**
   * Text to display
   */
  readonly children?: string;

  /**
   * The maximum amount of lines the text can occupy before being truncated with "...".
   * Uses predefined string values that correspond to a doubling scale for the amount of lines.
   */
  readonly maxLines?: TruncateLength;

  /**
   * Allow text to be resized based on user's device display scale
   */
  readonly allowFontScaling?: boolean;

  /**
   * Set the maximum font the text can go to size when the user scales their
   * device font size
   */
  readonly maxFontScaleSize?: number;

  /**
   * Determines whether text should be scaled down to fit based on maxLines prop
   */
  readonly adjustsFontSizeToFit?: boolean;

  /**
   * Line Height
   */
  readonly lineHeight?: LineHeight;

  /**
   * Spacing between letters
   */
  readonly letterSpacing?: LetterSpacing;

  /**
   * Font Family
   */
  readonly fontFamily?: T;

  /**
   * Font style
   */
  readonly fontStyle?: T extends "base" ? BaseStyle : DisplayStyle;

  /**
   * Font weight
   */
  readonly fontWeight?: T extends "base" ? BaseWeight : DisplayWeight;

  /**
   * Reverse theme for better display on dark background
   */
  readonly reverseTheme?: boolean;

  /**
   * Accessibility role describing the context of the text
   */
  readonly accessibilityRole?: TextAccessibilityRole;

  /**
   * This will make the text inaccessible to the screen reader.
   * This should be avoided unless there is a good reason.
   * For example this is used in InputText to make it so the label isn't
   * selectable because it is already read from the accessibilityLabel
   * of the TextInput
   */
  readonly hideFromScreenReader?: boolean;
  /**
   * Have text styled with strike through
   */
  readonly strikeThrough?: boolean;
}

const maxNumberOfLines = {
  single: 1,
  small: 2,
  base: 4,
  large: 8,
  extraLarge: 16,
  unlimited: undefined,
};

export const Typography = React.memo(InternalTypography);

function InternalTypography<T extends FontFamily = "base">({
  fontFamily,
  fontStyle,
  fontWeight,
  transform,
  color,
  align,
  size = "default",
  children,
  maxLines = "unlimited",
  allowFontScaling = true,
  maxFontScaleSize,
  adjustsFontSizeToFit = false,
  lineHeight,
  letterSpacing,
  reverseTheme = false,
  hideFromScreenReader = false,
  accessibilityRole = "text",
  strikeThrough = false,
  selectable = true,
}: TypographyProps<T>): JSX.Element {
  const sizeAndHeight = getSizeAndHeightStyle(size, lineHeight);
  const style: StyleProp<ViewStyle>[] = [
    getFontStyle(fontFamily, fontStyle, fontWeight),
    getColorStyle(color, reverseTheme),
    getAlignStyle(align),
    sizeAndHeight,
    getLetterSpacingStyle(letterSpacing),
  ];

  if (strikeThrough) {
    style.push(styles.strikeThrough);
  }
  const numberOfLinesForNativeText = maxNumberOfLines[maxLines];

  const text = getTransformedText(children, transform);
  const accessibilityProps: AccessibilityProps = hideFromScreenReader
    ? {
        accessibilityRole: "none",
        accessible: false,
        importantForAccessibility: "no-hide-descendants",
      }
    : { accessibilityRole };

  return (
    <TypographyGestureDetector>
      <Text
        {...{
          allowFontScaling,
          adjustsFontSizeToFit,
          style,
          numberOfLines: numberOfLinesForNativeText,
        }}
        {...accessibilityProps}
        maxFontSizeMultiplier={getScaleMultiplier(
          maxFontScaleSize,
          sizeAndHeight.fontSize,
        )}
        selectable={selectable}
        selectionColor={tokens["color-brand--highlight"]}
      >
        {text}
      </Text>
    </TypographyGestureDetector>
  );
}

function getScaleMultiplier(maxFontScaleSize = 0, size = 1) {
  if (maxFontScaleSize === 0) return undefined;

  return maxFontScaleSize / size;
}

function getFontStyle(
  fontFamily: FontFamily = "base",
  fontStyle: FontStyle = "regular",
  fontWeight: FontWeight = "regular",
) {
  const defaultBaseFontStyling = styles.baseRegularRegular;
  const defaultDisplayFontStyling = styles.displayRegularBold;
  const styleKey = `${fontFamily}${capitalize(fontStyle)}${capitalize(
    fontWeight,
  )}`;
  const fontStyling = styles[styleKey];
  if (fontStyling) {
    return fontStyling;
  } else {
    return fontFamily === "display"
      ? defaultDisplayFontStyling
      : defaultBaseFontStyling;
  }
}

function getTransformedText(text?: string, transform?: TextTransform) {
  switch (transform) {
    case "lowercase":
      return text?.toLocaleLowerCase();
    case "uppercase":
      return text?.toLocaleUpperCase();
    case "capitalize":
      return capitalize(text || "");
    default:
      return text;
  }
}

function getColorStyle(color?: TextColor, reverseTheme?: boolean) {
  if (color === "default" || !color) {
    return styles.greyBlue;
  }
  const colorStyleKey = `${color}${reverseTheme ? "Reverse" : ""}`;
  return styles[`${colorStyleKey}`];
}

function getAlignStyle(
  alignStyle: TextAlign = I18nManager.isRTL ? "end" : "start",
) {
  return styles[`${alignStyle}Align`];
}

function getSizeAndHeightStyle(
  textSize: TextSize,
  lineHeightOverwrite?: LineHeight,
) {
  const fontSize = styles[`${textSize}Size`];
  if (lineHeightOverwrite) {
    const lineHeight = styles[`${lineHeightOverwrite}LineHeight`];
    return StyleSheet.flatten([fontSize, lineHeight]);
  }
  return fontSize;
}

function getLetterSpacingStyle(letterSpacing: LetterSpacing = "base") {
  return styles[`${letterSpacing}LetterSpacing`];
}

export type FontFamily = "base" | "display";
export type FontStyle = "regular" | "italic";
export type FontWeight =
  | "regular"
  | "medium"
  | "bold"
  | "semiBold"
  | "extraBold"
  | "black";

export type BaseWeight = Extract<
  FontWeight,
  "regular" | "medium" | "semiBold" | "bold" | "extraBold"
>;

export type DisplayWeight = Extract<
  FontWeight,
  "semiBold" | "bold" | "extraBold" | "black"
>;

export type BaseStyle = FontStyle;
export type DisplayStyle = Extract<FontStyle, "regular">;

export type TextColor =
  | TextVariation
  | "default"
  | "blue"
  | "blueDark"
  | "white"
  | "green"
  | "greenDark"
  | "grey"
  | "greyDark"
  | "greyBlue"
  | "greyBlueDark"
  | "lightBlue"
  | "lightBlueDark"
  | "red"
  | "redDark"
  | "yellow"
  | "yellowDark"
  | "yellowGreenDark"
  | "orangeDark"
  | "navyDark"
  | "limeDark"
  | "purpleDark"
  | "pinkDark"
  | "tealDark"
  | "indigoDark"
  | "navy"
  | "text"
  | "heading"
  | "textSecondary"
  | "textReverse"
  | "textReverseSecondary"
  | "interactive"
  | "destructive"
  | "learning"
  | "subtle"
  | "onPrimary";

export type TextVariation =
  | "success"
  | "interactive"
  | "error"
  | "base"
  | "subdued"
  | "warn"
  | "info"
  | "disabled"
  | "critical";

export type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none";

export type TextSize =
  | "smallest"
  | "smaller"
  | "small"
  | "default"
  | "large"
  | "larger"
  | "largest"
  | "jumbo"
  | "extravagant";

export type TextAlign = "start" | "end" | "center" | "justify";

export type LineHeight =
  | "extravagant"
  | "jumbo"
  | "largest"
  | "larger"
  | "large"
  | "base"
  | "tight";

export type LetterSpacing = "base" | "loose";

export type TextAccessibilityRole = "text" | "header";

export type TruncateLength =
  | "single"
  | "small"
  | "base"
  | "large"
  | "extraLarge"
  | "unlimited";
