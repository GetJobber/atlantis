import { StyleSheet } from "react-native";
// eslint-disable-next-line import/no-internal-modules
import { JobberStyle } from "@jobber/design/foundation";

const iconTranslateY = JobberStyle["space-large"] / 2;
const buttonRadius = JobberStyle["radius-large"];
export const baseButtonHeight = JobberStyle["space-base"] * 3.5;
export const smallButtonHeight = JobberStyle["space-base"] * 2.25;

export const styles = StyleSheet.create({
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
    borderWidth: JobberStyle["border-base"],
    paddingVertical: JobberStyle["space-small"],
  },

  base: {
    minHeight: baseButtonHeight,
    paddingHorizontal: JobberStyle["space-base"],
  },

  small: {
    minHeight: smallButtonHeight,
    paddingHorizontal:
      JobberStyle["space-small"] + JobberStyle["space-smaller"],
  },

  reducedPaddingForFullWidth: {
    paddingHorizontal: JobberStyle["space-smaller"],
  },

  iconPaddingOffset: {
    paddingRight: JobberStyle["space-smaller"],
  },

  content: {
    paddingLeft: JobberStyle["space-large"],
    height: "100%",
  },

  contentWithLabel: {
    paddingLeft: JobberStyle["space-large"] + JobberStyle["space-small"],
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
    backgroundColor: JobberStyle["color-interactive"],
    borderColor: JobberStyle["color-interactive"],
  },

  learning: {
    backgroundColor: JobberStyle["color-informative"],
    borderColor: JobberStyle["color-informative"],
  },

  destructive: {
    backgroundColor: JobberStyle["color-destructive"],
    borderColor: JobberStyle["color-destructive"],
  },

  /* Cancel is special because, by default, it's styled as a secondary button */
  cancel: {
    backgroundColor: JobberStyle["color-surface"],
    borderColor: JobberStyle["color-interactive--subtle"],
  },

  /* Types */

  primary: {},

  secondary: {
    backgroundColor: JobberStyle["color-surface"],
  },

  tertiary: {
    backgroundColor: JobberStyle["color-surface"],
    borderColor: JobberStyle["color-surface"],
  },

  /* Disabled */

  disabled: {
    borderColor: JobberStyle["color-disabled--secondary"],
    backgroundColor: JobberStyle["color-disabled--secondary"],
  },
});
