import { Platform, StyleSheet, TextStyle } from "react-native";
import { webFonts } from "./webFonts";
import { tokens } from "../utils/design";

const extravagantLineHeight = tokens["typography--lineHeight-extravagant"];
const jumboLineHeight = tokens["typography--lineHeight-jumbo"];
const largestLineHeight = tokens["typography--lineHeight-largest"];
const largerLineHeight = tokens["typography--lineHeight-larger"];
const largeLineHeight = tokens["typography--lineHeight-large"];
const baseLineHeight = tokens["typography--lineHeight-base"];
const tightLineHeight = tokens["typography--lineHeight-tight"];
const minisculeLineHeight = tokens["typography--lineHeight-miniscule"];

const deviceFonts = {
  baseRegularRegular: {
    fontFamily: "inter-regular",
  },

  baseRegularMedium: {
    fontFamily: "inter-medium",
  },

  baseRegularBold: {
    fontFamily: "inter-bold",
  },

  baseRegularSemiBold: {
    fontFamily: "inter-semibold",
  },

  baseRegularExtraBold: {
    fontFamily: "inter-extrabold",
  },

  displayRegularBold: {
    fontFamily: "jobberpro-bd",
  },

  displayRegularExtraBold: {
    fontFamily: "jobberpro-xbd",
  },

  displayRegularBlack: {
    fontFamily: "jobberpro-blk",
  },
};

/**
 * We need to use web fonts for rendering Typography on Storybook
 * because it uses font files (.ttf) to render them on devices.
 * As we don't want to expose the font files, we are setting the fonts
 * in CSS.
 */
const fonts = Platform.select({
  web: webFonts,
  default: deviceFonts,
});

/**
 * Reusable typography tokens to ensure consistency for any client facing texts.
 */
export const typographyTokens: { [index: string]: TextStyle } = {
  // This follows a pattern of
  // { fontFamily }{ fontStyle }{ fontWeight }
  ...fonts,

  startAlign: {
    textAlign: "left",
  },

  endAlign: {
    textAlign: "right",
  },

  centerAlign: {
    textAlign: "center",
  },

  justifyAlign: {
    textAlign: "justify",
  },

  blue: {
    color: tokens["color-heading"],
  },

  blueDark: {
    color: tokens["color-blue--dark"],
  },

  white: {
    color: tokens["color-white"],
  },

  green: {
    color: tokens["color-green"],
  },

  greenDark: {
    color: tokens["color-green--dark"],
  },

  grey: {
    color: tokens["color-grey"],
  },

  greyDark: {
    color: tokens["color-grey--dark"],
  },

  greyBlue: {
    color: tokens["color-greyBlue"],
  },

  greyBlueDark: {
    color: tokens["color-greyBlue--dark"],
  },

  lightBlue: {
    color: tokens["color-lightBlue"],
  },

  lightBlueDark: {
    color: tokens["color-lightBlue--dark"],
  },

  red: {
    color: tokens["color-red"],
  },

  redDark: {
    color: tokens["color-red--dark"],
  },

  yellow: {
    color: tokens["color-yellow"],
  },

  yellowDark: {
    color: tokens["color-yellow--dark"],
  },

  yellowGreenDark: {
    color: tokens["color-yellowGreen--dark"],
  },

  orangeDark: {
    color: tokens["color-orange--dark"],
  },

  navyDark: {
    color: tokens["color-navy--dark"],
  },

  limeDark: {
    color: tokens["color-lime--dark"],
  },

  purpleDark: {
    color: tokens["color-purple--dark"],
  },

  pinkDark: {
    color: tokens["color-pink--dark"],
  },

  tealDark: {
    color: tokens["color-teal--dark"],
  },

  indigoDark: {
    color: tokens["color-indigo--dark"],
  },

  navy: {
    color: tokens["color-navy"],
  },

  heading: {
    color: tokens["color-heading"],
  },

  headingReverse: {
    color: tokens["color-text--reverse"],
  },

  text: {
    color: tokens["color-text"],
  },

  textSecondary: {
    color: tokens["color-text--secondary"],
  },

  textReverse: {
    color: tokens["color-text--reverse"],
  },

  textReverseSecondary: {
    color: tokens["color-text--reverse--secondary"],
  },

  success: {
    color: tokens["color-success--onSurface"],
  },

  error: {
    color: tokens["color-critical"],
  },

  base: {
    color: tokens["color-text"],
  },

  subdued: {
    color: tokens["color-text--secondary"],
  },

  warn: {
    color: tokens["color-warning--onSurface"],
  },

  info: {
    color: tokens["color-informative--onSurface"],
  },

  critical: {
    color: tokens["color-critical"],
  },

  successReverse: {
    color: tokens["color-success"],
  },

  errorReverse: {
    color: tokens["color-critical"],
  },

  baseReverse: {
    color: tokens["color-text--reverse"],
  },

  subduedReverse: {
    color: tokens["color-text--reverse--secondary"],
  },

  warnReverse: {
    color: tokens["color-warning"],
  },

  infoReverse: {
    color: tokens["color-informative"],
  },

  criticalReverse: {
    color: tokens["color-critical"],
  },

  interactive: {
    color: tokens["color-interactive"],
  },

  destructive: {
    color: tokens["color-destructive"],
  },

  learning: {
    color: tokens["color-informative"],
  },

  subtle: {
    color: tokens["color-interactive--subtle"],
  },

  onPrimary: {
    color: tokens["color-surface"],
  },

  disabled: {
    color: tokens["color-disabled"],
  },

  smallestSize: {
    fontSize: tokens["typography--fontSize-smallest"],
    lineHeight: minisculeLineHeight,
  },

  smallerSize: {
    fontSize: tokens["typography--fontSize-smaller"],
    lineHeight: tightLineHeight,
  },

  smallSize: {
    fontSize: tokens["typography--fontSize-small"],
    lineHeight: tightLineHeight,
  },

  defaultSize: {
    fontSize: tokens["typography--fontSize-base"],
    lineHeight: baseLineHeight,
  },

  largeSize: {
    fontSize: tokens["typography--fontSize-large"],
    lineHeight: largeLineHeight,
  },

  largerSize: {
    fontSize: tokens["typography--fontSize-larger"],
    lineHeight: largeLineHeight,
  },

  largestSize: {
    fontSize: tokens["typography--fontSize-largest"],
    lineHeight: largerLineHeight,
  },

  jumboSize: {
    fontSize: tokens["typography--fontSize-jumbo"],
    lineHeight: jumboLineHeight,
  },

  extravagantSize: {
    fontSize: tokens["typography--fontSize-extravagant"],
    lineHeight: extravagantLineHeight,
  },

  extravagantLineHeight: {
    lineHeight: extravagantLineHeight,
  },

  jumboLineHeight: {
    lineHeight: jumboLineHeight,
  },

  largestLineHeight: {
    lineHeight: largestLineHeight,
  },
  largerLineHeight: {
    lineHeight: largerLineHeight,
  },

  largeLineHeight: {
    lineHeight: largeLineHeight,
  },

  baseLineHeight: {
    lineHeight: baseLineHeight,
  },

  tightLineHeight: {
    lineHeight: tightLineHeight,
  },

  baseLetterSpacing: {
    letterSpacing: tokens["typography--letterSpacing-base"],
  },

  looseLetterSpacing: {
    letterSpacing: tokens["typography--letterSpacing-loose"],
  },

  strikeThrough: {
    textDecorationLine: "line-through",
  },
};

/**
 * `StyleSheet` for Typography.tsx.
 *
 * If you find yourself needing to use what's inside this object on files other
 * than `<Typography />`, please import from `@jobber/components-native` instead.
 *
 * ```
 * import { typographyStyles } from "@jobber/components-native"
 * ```
 */
export const typographyStyles: { [index: string]: TextStyle } =
  StyleSheet.create(typographyTokens);
