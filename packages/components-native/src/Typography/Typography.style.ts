import { Platform, StyleSheet, TextStyle } from "react-native";
import { webFonts } from "./webFonts";
import { tokens as staticTokens } from "../utils/design";
import {
  AtlantisThemeContextValue,
  buildThemedStyles,
} from "../AtlantisThemeContext";

const extravagantLineHeight =
  staticTokens["typography--lineHeight-extravagant"];
const jumboLineHeight = staticTokens["typography--lineHeight-jumbo"];
const largestLineHeight = staticTokens["typography--lineHeight-largest"];
const largerLineHeight = staticTokens["typography--lineHeight-larger"];
const largeLineHeight = staticTokens["typography--lineHeight-large"];
const baseLineHeight = staticTokens["typography--lineHeight-base"];
const tightLineHeight = staticTokens["typography--lineHeight-tight"];
const minusculeLineHeight = staticTokens["typography--lineHeight-minuscule"];

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

  baseItalicRegular: {
    fontFamily: "inter-italic",
  },

  baseItalicMedium: {
    fontFamily: "inter-italic-medium",
  },

  baseItalicBold: {
    fontFamily: "inter-italic-bold",
  },

  baseItalicSemiBold: {
    fontFamily: "inter-italic-semibold",
  },

  baseItalicExtraBold: {
    fontFamily: "inter-italic-extrabold",
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
export const createTypographyTokens = (
  tokens: AtlantisThemeContextValue["tokens"] | typeof staticTokens,
): { [index: string]: TextStyle } => ({
  // This follows a pattern of
  // { fontFamily }{ fontStyle }{ fontWeight }
  ...fonts,

  italic: {
    fontStyle: "italic",
  },

  underline: {
    textDecorationColor: tokens["color-text--secondary"],
    textDecorationLine: "underline",
  },

  /**
   * Alignments
   */

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

  /**
   * Colors
   */

  // Base colors for backwards compatibility

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

  // Typography
  heading: {
    color: tokens["color-heading"],
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

  // Statuses

  inactive: {
    color: tokens["color-inactive"],
  },

  inactiveSurface: {
    color: tokens["color-inactive--surface"],
  },

  inactiveOnSurface: {
    color: tokens["color-inactive--onSurface"],
  },

  critical: {
    color: tokens["color-critical"],
  },

  criticalSurface: {
    color: tokens["color-critical--surface"],
  },

  criticalOnSurface: {
    color: tokens["color-critical--onSurface"],
  },

  warning: {
    color: tokens["color-warning"],
  },

  warningSurface: {
    color: tokens["color-warning--surface"],
  },

  warningOnSurface: {
    color: tokens["color-warning--onSurface"],
  },

  informative: {
    color: tokens["color-informative"],
  },

  informativeSurface: {
    color: tokens["color-informative--surface"],
  },

  informativeOnSurface: {
    color: tokens["color-informative--onSurface"],
  },

  // To be uncommented once success in Deprecated is removed
  // success: {
  //   color: tokens["color-success"],
  // },

  successSurface: {
    color: tokens["color-success--surface"],
  },

  successOnSurface: {
    color: tokens["color-success--onSurface"],
  },

  // Interactions

  interactive: {
    color: tokens["color-interactive"],
  },

  interactiveHover: {
    color: tokens["color-interactive--hover"],
  },

  interactiveSubtle: {
    color: tokens["color-interactive--subtle"],
  },

  interactiveSubtleHover: {
    color: tokens["color-interactive--subtle--hover"],
  },

  destructive: {
    color: tokens["color-destructive"],
  },

  destructiveHover: {
    color: tokens["color-destructive--hover"],
  },

  disabled: {
    color: tokens["color-disabled"],
  },

  disabledSecondary: {
    color: tokens["color-disabled--secondary"],
  },

  // Workflow

  request: {
    color: tokens["color-request"],
  },

  requestSurface: {
    color: tokens["color-request--surface"],
  },

  requestOnSurface: {
    color: tokens["color-request--onSurface"],
  },

  quote: {
    color: tokens["color-quote"],
  },

  quoteSurface: {
    color: tokens["color-quote--surface"],
  },

  quoteOnSurface: {
    color: tokens["color-quote--onSurface"],
  },

  job: {
    color: tokens["color-job"],
  },

  jobSurface: {
    color: tokens["color-job--surface"],
  },

  jobOnSurface: {
    color: tokens["color-job--onSurface"],
  },

  visit: {
    color: tokens["color-visit"],
  },

  visitSurface: {
    color: tokens["color-visit--surface"],
  },

  visitOnSurface: {
    color: tokens["color-visit--onSurface"],
  },

  task: {
    color: tokens["color-task"],
  },

  taskSurface: {
    color: tokens["color-task--surface"],
  },

  taskOnSurface: {
    color: tokens["color-task--onSurface"],
  },

  event: {
    color: tokens["color-event"],
  },

  eventSurface: {
    color: tokens["color-event--surface"],
  },

  eventOnSurface: {
    color: tokens["color-event--onSurface"],
  },

  invoice: {
    color: tokens["color-invoice"],
  },

  invoiceSurface: {
    color: tokens["color-invoice--surface"],
  },

  invoiceOnSurface: {
    color: tokens["color-invoice--onSurface"],
  },

  payments: {
    color: tokens["color-payments"],
  },

  paymentsSurface: {
    color: tokens["color-payments--surface"],
  },

  paymentsOnSurface: {
    color: tokens["color-payments--onSurface"],
  },

  client: {
    color: tokens["color-client"],
  },

  // Miscellaneous

  icon: {
    color: tokens["color-icon"],
  },

  brand: {
    color: tokens["color-brand"],
  },

  // Deprecated

  blue: {
    color: tokens["color-heading"],
  },

  base: {
    color: tokens["color-text"],
  },

  baseReverse: {
    color: tokens["color-text--reverse"],
  },

  headingReverse: {
    color: tokens["color-text--reverse"],
  },

  error: {
    color: tokens["color-critical"],
  },

  errorReverse: {
    color: tokens["color-critical"],
  },

  success: {
    color: tokens["color-success--onSurface"],
  },

  successReverse: {
    color: tokens["color-success"],
  },

  warn: {
    color: tokens["color-warning--onSurface"],
  },

  warnReverse: {
    color: tokens["color-warning"],
  },

  subdued: {
    color: tokens["color-text--secondary"],
  },

  subduedReverse: {
    color: tokens["color-text--reverse--secondary"],
  },

  info: {
    color: tokens["color-informative--onSurface"],
  },

  infoReverse: {
    color: tokens["color-informative"],
  },

  criticalReverse: {
    color: tokens["color-critical"],
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

  /**
   * Sizes
   */

  smallestSize: {
    fontSize: tokens["typography--fontSize-smallest"],
    lineHeight: minusculeLineHeight,
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

  /**
   * Line Heights
   */

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

  /**
   * Letter Spacings
   */

  baseLetterSpacing: {
    letterSpacing: tokens["typography--letterSpacing-base"],
  },

  looseLetterSpacing: {
    letterSpacing: tokens["typography--letterSpacing-loose"],
  },

  strikeThrough: {
    textDecorationLine: "line-through",
  },
});

/**
 * @deprecated Use useCommonInputStyles instead
 */
export const typographyStyles: Record<string, TextStyle> = StyleSheet.create(
  createTypographyTokens(staticTokens),
);

export const useTypographyStyles = buildThemedStyles(createTypographyTokens);
