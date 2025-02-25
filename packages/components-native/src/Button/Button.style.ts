import { tokens as staticTokens } from "../utils/design";
import { buildThemedStyles } from "../AtlantisThemeContext";

const iconTranslateY = staticTokens["space-large"] / 2;
const buttonRadius = staticTokens["radius-base"];
export const baseButtonHeight = staticTokens["space-base"] * 3;
export const smallButtonHeight = staticTokens["space-base"] * 2.5;

export const useStyles = buildThemedStyles(tokens => {
  return {
    fullHeight: {
      flexGrow: 1,
      flexShrink: 0,
    },

    fullWidth: {
      alignSelf: "stretch",
    },

    touchable: {
      borderRadius: buttonRadius,
    },

    button: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
      flexDirection: "row",
      overflow: "hidden",
      margin: 0,
      borderRadius: buttonRadius,
      borderWidth: tokens["border-base"],
      paddingVertical: tokens["space-small"],
    },

    base: {
      minHeight: baseButtonHeight,
      // paddingHorizontal: tokens["space-base"],
    },

    small: {
      minHeight: smallButtonHeight,
      paddingHorizontal: tokens["space-small"] + tokens["space-smaller"],
    },

    reducedPaddingForFullWidth: {
      paddingHorizontal: tokens["space-smaller"],
    },

    iconPaddingOffset: {
      paddingRight: tokens["space-smaller"],
    },

    content: {
      paddingLeft: tokens["space-large"],
      height: "100%",
    },

    contentWithLabel: {
      paddingLeft: tokens["space-large"] + tokens["space-small"],
    },

    iconStyle: {
      position: "absolute",
      top: "50%",
      left: 0,
      transform: [{ translateY: -iconTranslateY }],
    },

    labelStyle: {
      flexGrow: 1,
      justifyContent: "center",
    },

    /* Variations */
    work: {
      backgroundColor: tokens["color-interactive"],
      borderColor: tokens["color-interactive"],
    },

    learning: {
      backgroundColor: tokens["color-interactive--subtle"],
      borderColor: tokens["color-interactive--subtle"],
    },

    destructive: {
      backgroundColor: tokens["color-destructive"],
      borderColor: tokens["color-destructive"],
    },

    /* Cancel is special because, by default, it's styled as a secondary button */
    cancel: {
      backgroundColor: tokens["color-surface"],
      borderColor: tokens["color-border"],
    },

    cancelSecondary: {
      borderColor: "transparent",
    },

    /* Types */
    primary: {},

    secondary: {
      backgroundColor: tokens["color-surface"],
      borderColor: tokens["color-border"],
    },

    tertiary: {
      backgroundColor: tokens["color-surface"],
      borderColor: "transparent",
    },

    /* Disabled */
    disabled: {
      borderColor: tokens["color-disabled--secondary"],
      backgroundColor: tokens["color-disabled--secondary"],
    },
  };
});
