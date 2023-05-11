import { StyleSheet, TextStyle } from "react-native";
import { JobberStyle } from "../utils/design";

const extravagantLineHeight = JobberStyle["typography--lineHeight-extravagant"];
const jumboLineHeight = JobberStyle["typography--lineHeight-jumbo"];
const largestLineHeight = JobberStyle["typography--lineHeight-largest"];
const largerLineHeight = JobberStyle["typography--lineHeight-larger"];
const largeLineHeight = JobberStyle["typography--lineHeight-large"];
const baseLineHeight = JobberStyle["typography--lineHeight-base"];
const tightLineHeight = JobberStyle["typography--lineHeight-tight"];
const minisculeLineHeight = JobberStyle["typography--lineHeight-miniscule"];

/**
 * Reusable typography tokens to ensure consistency for any client facing texts.
 */
export const typographyStyles: { [index: string]: TextStyle } = {
  // This follows a pattern of
  // { fontFamily }{ fontStyle }{ fontWeight }
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
    color: JobberStyle["color-heading"],
  },

  blueDark: {
    color: JobberStyle["color-blue--dark"],
  },

  white: {
    color: JobberStyle["color-white"],
  },

  green: {
    color: JobberStyle["color-green"],
  },

  greenDark: {
    color: JobberStyle["color-green--dark"],
  },

  grey: {
    color: JobberStyle["color-grey"],
  },

  greyDark: {
    color: JobberStyle["color-grey--dark"],
  },

  greyBlue: {
    color: JobberStyle["color-greyBlue"],
  },

  greyBlueDark: {
    color: JobberStyle["color-greyBlue--dark"],
  },

  lightBlue: {
    color: JobberStyle["color-lightBlue"],
  },

  lightBlueDark: {
    color: JobberStyle["color-lightBlue--dark"],
  },

  red: {
    color: JobberStyle["color-red"],
  },

  redDark: {
    color: JobberStyle["color-red--dark"],
  },

  yellow: {
    color: JobberStyle["color-yellow"],
  },

  yellowDark: {
    color: JobberStyle["color-yellow--dark"],
  },

  yellowGreenDark: {
    color: JobberStyle["color-yellowGreen--dark"],
  },

  orangeDark: {
    color: JobberStyle["color-orange--dark"],
  },

  navyDark: {
    color: JobberStyle["color-navy--dark"],
  },

  limeDark: {
    color: JobberStyle["color-lime--dark"],
  },

  purpleDark: {
    color: JobberStyle["color-purple--dark"],
  },

  pinkDark: {
    color: JobberStyle["color-pink--dark"],
  },

  tealDark: {
    color: JobberStyle["color-teal--dark"],
  },

  indigoDark: {
    color: JobberStyle["color-indigo--dark"],
  },

  navy: {
    color: JobberStyle["color-navy"],
  },

  heading: {
    color: JobberStyle["color-heading"],
  },

  headingReverse: {
    color: JobberStyle["color-text--reverse"],
  },

  text: {
    color: JobberStyle["color-text"],
  },

  textSecondary: {
    color: JobberStyle["color-text--secondary"],
  },

  textReverse: {
    color: JobberStyle["color-text--reverse"],
  },

  textReverseSecondary: {
    color: JobberStyle["color-text--reverse--secondary"],
  },

  success: {
    color: JobberStyle["color-success--onSurface"],
  },

  error: {
    color: JobberStyle["color-critical"],
  },

  base: {
    color: JobberStyle["color-text"],
  },

  subdued: {
    color: JobberStyle["color-text--secondary"],
  },

  warn: {
    color: JobberStyle["color-warning--onSurface"],
  },

  info: {
    color: JobberStyle["color-informative--onSurface"],
  },

  critical: {
    color: JobberStyle["color-critical"],
  },

  successReverse: {
    color: JobberStyle["color-success"],
  },

  errorReverse: {
    color: JobberStyle["color-critical"],
  },

  baseReverse: {
    color: JobberStyle["color-text--reverse"],
  },

  subduedReverse: {
    color: JobberStyle["color-text--reverse--secondary"],
  },

  warnReverse: {
    color: JobberStyle["color-warning"],
  },

  infoReverse: {
    color: JobberStyle["color-informative"],
  },

  criticalReverse: {
    color: JobberStyle["color-critical"],
  },

  interactive: {
    color: JobberStyle["color-interactive"],
  },

  destructive: {
    color: JobberStyle["color-destructive"],
  },

  learning: {
    color: JobberStyle["color-informative"],
  },

  subtle: {
    color: JobberStyle["color-interactive--subtle"],
  },

  onPrimary: {
    color: JobberStyle["color-surface"],
  },

  disabled: {
    color: JobberStyle["color-disabled"],
  },

  smallestSize: {
    fontSize: JobberStyle["typography--fontSize-smallest"],
    lineHeight: minisculeLineHeight,
  },

  smallerSize: {
    fontSize: JobberStyle["typography--fontSize-smaller"],
    lineHeight: tightLineHeight,
  },

  smallSize: {
    fontSize: JobberStyle["typography--fontSize-small"],
    lineHeight: tightLineHeight,
  },

  defaultSize: {
    fontSize: JobberStyle["typography--fontSize-base"],
    lineHeight: baseLineHeight,
  },

  largeSize: {
    fontSize: JobberStyle["typography--fontSize-large"],
    lineHeight: largeLineHeight,
  },

  largerSize: {
    fontSize: JobberStyle["typography--fontSize-larger"],
    lineHeight: largeLineHeight,
  },

  largestSize: {
    fontSize: JobberStyle["typography--fontSize-largest"],
    lineHeight: largerLineHeight,
  },

  jumboSize: {
    fontSize: JobberStyle["typography--fontSize-jumbo"],
    lineHeight: jumboLineHeight,
  },

  extravagantSize: {
    fontSize: JobberStyle["typography--fontSize-extravagant"],
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
    letterSpacing: JobberStyle["typography--letterSpacing-base"],
  },

  looseLetterSpacing: {
    letterSpacing: JobberStyle["typography--letterSpacing-loose"],
  },

  strikeThrough: {
    textDecorationLine: "line-through",
  },
};

/**
 * `StyleSheet` for Typography.tsx.
 *
 * If you find yourself needing to use what's inside this object on files other
 * than `<Typography />`, please import from `@jobber/components-native/Typography` instead.
 *
 * ```
 * import { styles } from "@jobber/components-native/Typography"
 * ```
 */
export const styles: { [index: string]: TextStyle } =
  StyleSheet.create(typographyStyles);
