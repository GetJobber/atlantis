import { StyleSheet } from "react-native";
import { commonInputStyles } from "./CommonInputStyles.style";
import { tokens } from "../utils/design";
import { typographyStyles } from "../Typography";

export const styles = StyleSheet.create({
  container: StyleSheet.flatten([commonInputStyles.container]),

  inputContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },

  inputFocused: {
    borderColor: tokens["color-interactive"],
  },

  inputInvalid: {
    borderColor: tokens["color-critical"],
  },

  label: {
    // for placeholder
    position: "absolute",
    top: typographyStyles.smallSize.fontSize,
    right: 0,
    bottom: 0,
    left: 0,
  },

  miniLabel: {
    top: 0,
    paddingTop: tokens["space-smallest"],
    backgroundColor: tokens["color-surface"],
    maxHeight:
      (typographyStyles.smallSize.lineHeight || 0) + tokens["space-smaller"],
    zIndex: 1,
  },
  // Prevents the miniLabel from cutting off the ClearAction button
  miniLabelShowClearAction: {
    backgroundColor: "transparent",
  },

  disabled: {
    backgroundColor: tokens["color-disabled--secondary"],
    borderTopLeftRadius: tokens["radius-large"],
    borderTopRightRadius: tokens["radius-large"],
  },

  fieldAffix: {
    flexDirection: "row",
  },

  fieldAffixMiniLabel: {
    paddingTop: 0,
    // @ts-expect-error tsc-ci
    top: typographyStyles.smallSize.fontSize / 2,
    right: 0,
    bottom: 0,
    left: 0,
  },

  prefixIcon: {
    justifyContent: "center",
    paddingRight: tokens["space-small"],
  },

  prefixLabel: {
    justifyContent: "center",
    paddingTop: tokens["space-minuscule"],
    paddingRight: tokens["space-minuscule"],
  },

  suffixIcon: {
    justifyContent: "center",
  },

  suffixLabel: {
    justifyContent: "center",
    paddingTop: tokens["space-minuscule"],
  },
  suffixIconMargin: {
    marginLeft: tokens["space-small"] + tokens["space-smaller"],
  },
  suffixLabelMargin: {
    marginLeft: tokens["space-smallest"],
  },
  inputEndContainer: {
    flexDirection: "row",
    zIndex: 1,
  },
});
