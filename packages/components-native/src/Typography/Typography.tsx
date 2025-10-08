import React from "react";
import type {
  AccessibilityProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { I18nManager, StyleSheet, Text } from "react-native";
import { TypographyGestureDetector } from "./TypographyGestureDetector";
import { useTypographyStyles } from "./Typography.style";
import { capitalize } from "../utils/intl";
import { useAtlantisTheme } from "../AtlantisThemeContext";

export interface TypographyProps<T extends FontFamily> {
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
   * Lets the user select text, to use the native copy and paste functionality.
   * WARNING: if true, this prevents ellipsis from being shown on Android.
   * @default true
   */
  readonly selectable?: boolean;

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
   * WARNING: if `selectable` is true, Android will not show an ellipsis.
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
   * Underline style to use for the text. The non-solid style is only supported
   * on iOS, as per React Native's Text component's limitations.
   * https://reactnative.dev/docs/text-style-props#textdecorationstyle-ios
   */
  readonly underline?: "solid" | "double" | "dotted" | "dashed" | undefined;

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

  readonly UNSAFE_style?: TypographyUnsafeStyle;

  /**
   * Callback behaves differently on iOS and Android.
   * On iOS, it is called when the text is laid out.
   * On Android, it is called before the text is laid out.
   * @see https://reactnative.dev/docs/text#ontextlayout
   */
  readonly onTextLayout?: OnTextLayoutEvent;
}

const maxNumberOfLines = {
  single: 1,
  small: 2,
  base: 4,
  large: 8,
  extraLarge: 16,
  unlimited: undefined,
};

export interface TypographyUnsafeStyle {
  textStyle?: StyleProp<TextStyle>;
}

export const Typography = React.memo(InternalTypography);

// eslint-disable-next-line max-statements
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
  letterSpacing = "base",
  reverseTheme = false,
  hideFromScreenReader = false,
  accessibilityRole = "text",
  strikeThrough = false,
  underline,
  UNSAFE_style,
  selectable = true,
  onTextLayout,
}: TypographyProps<T>): React.JSX.Element {
  const styles = useTypographyStyles();
  const sizeAndHeight = getSizeAndHeightStyle(size, styles, lineHeight);
  const style: StyleProp<ViewStyle>[] = [
    getFontStyle(fontFamily, fontStyle, fontWeight, styles),
    getColorStyle(styles, color, reverseTheme),
    getAlignStyle(styles, align),
    sizeAndHeight,
    getLetterSpacingStyle(letterSpacing, styles),
  ];

  if (strikeThrough) {
    style.push(styles.strikeThrough);
  }

  if (fontStyle === "italic") {
    style.push(styles.italic);
  }

  if (underline) {
    const underlineTextStyle: TextStyle = { textDecorationStyle: underline };
    style.push(underlineTextStyle, styles.underline);
  }

  if (UNSAFE_style?.textStyle) {
    style.push(UNSAFE_style.textStyle);
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

  const { tokens } = useAtlantisTheme();

  const textComponent = (
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
      onTextLayout={onTextLayout}
    >
      {text}
    </Text>
  );

  // If text is not selectable, there's no need for TypographyGestureDetector
  // since it only prevents accidental highlighting of selectable text
  if (!selectable) {
    return textComponent;
  }

  return <TypographyGestureDetector>{textComponent}</TypographyGestureDetector>;
}

function getScaleMultiplier(maxFontScaleSize = 0, size = 1) {
  if (maxFontScaleSize === 0) return undefined;

  return maxFontScaleSize / size;
}

function getFontStyle(
  fontFamily: FontFamily = "base",
  fontStyle: FontStyle = "regular",
  fontWeight: FontWeight = "regular",
  styles: ReturnType<typeof useTypographyStyles>,
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

function getColorStyle(
  styles: ReturnType<typeof useTypographyStyles>,
  color?: TextColor,
  reverseTheme?: boolean,
) {
  if (color === "default" || !color) {
    return styles.greyBlue;
  }
  const colorStyleKey = `${color}${reverseTheme ? "Reverse" : ""}`;

  return styles[`${colorStyleKey}`];
}

function getAlignStyle(
  styles: ReturnType<typeof useTypographyStyles>,
  alignStyle: TextAlign = I18nManager.isRTL ? "end" : "start",
) {
  return styles[`${alignStyle}Align`];
}

function getSizeAndHeightStyle(
  textSize: TextSize,
  styles: ReturnType<typeof useTypographyStyles>,
  lineHeightOverwrite?: LineHeight,
) {
  const fontSize = styles[`${textSize}Size`];

  if (lineHeightOverwrite) {
    const lineHeight = styles[`${lineHeightOverwrite}LineHeight`];

    return StyleSheet.flatten([fontSize, lineHeight]);
  }

  return fontSize;
}

function getLetterSpacingStyle(
  letterSpacing: LetterSpacing,
  styles: ReturnType<typeof useTypographyStyles>,
) {
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
  // Base colors for backwards compatibility
  | "default"
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

  // Typography
  | "heading"
  | "text"
  | "textSecondary"
  | "textReverse"
  | "textReverseSecondary"

  // Statuses
  | "inactive"
  | "inactiveSurface"
  | "inactiveOnSurface"
  | "critical"
  | "criticalSurface"
  | "criticalOnSurface"
  | "warning"
  | "warningSurface"
  | "warningOnSurface"
  | "informative"
  | "informativeSurface"
  | "informativeOnSurface"
  | "successSurface"
  | "successOnSurface"

  // Interactions
  | "interactiveHover"
  | "interactiveSubtleHover"
  | "destructiveHover"
  | "disabledSecondary"

  // Workflow
  | "request"
  | "requestSurface"
  | "requestOnSurface"
  | "quote"
  | "quoteSurface"
  | "quoteOnSurface"
  | "job"
  | "jobSurface"
  | "jobOnSurface"
  | "visit"
  | "visitSurface"
  | "visitOnSurface"
  | "task"
  | "taskSurface"
  | "taskOnSurface"
  | "event"
  | "eventSurface"
  | "eventOnSurface"
  | "invoice"
  | "invoiceSurface"
  | "invoiceOnSurface"
  | "payments"
  | "paymentsSurface"
  | "paymentsOnSurface"
  | "client"

  // Deprecated
  | "blue" // Use "heading" instead
  | "learning" // Use "informative" instead
  | "subtle" // Use "interactiveSubtle" instead
  | "onPrimary"; // Use "subtle" instead

// A subset of colors that can be used with the Text component
export type TextVariation =
  | "text"
  | "textSecondary"
  | "interactive"
  | "interactiveSubtle"
  | "successOnSurface"
  | "critical"
  | "warning"
  | "informativeOnSurface"
  | "disabled"
  | "destructive"

  // Deprecated
  | "base" // Use "text" instead
  | "success" // Use "successOnSurface" instead (except for when reverseTheme=true)
  | "subdued" // Use "textSecondary" instead
  | "error" // Use "critical" instead
  | "warn" // Use "warningOnSurface" instead
  | "info"; // Use "informativeOnSurface" instead

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

export type OnTextLayoutEvent = Exclude<TextProps["onTextLayout"], undefined>;
