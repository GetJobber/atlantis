import { StyleSheet } from "react-native";
import { typographyStyles } from "../Typography";
import { tokens } from "../utils/design";

export const commonInputStyles = StyleSheet.create({
  input: {
    width: "100%",
    flexShrink: 1,
    flexGrow: 1,
    color: tokens["color-text"],
    fontFamily: typographyStyles.baseRegularRegular.fontFamily,
    fontSize: typographyStyles.defaultSize.fontSize,
    letterSpacing: typographyStyles.baseLetterSpacing.letterSpacing,
    minHeight: tokens["space-largest"],
    padding: 0,
  },

  inputEmpty: {
    paddingTop: 0,
  },

  inputDisabled: {
    color: typographyStyles.disabled.color,
  },

  container: {
    marginVertical: tokens["space-smaller"],
    backgroundColor: tokens["color-surface"],
    minHeight: tokens["space-largest"],
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderColor: tokens["color-grey"],
    borderStyle: "solid",
    borderBottomWidth: tokens["border-base"],
  },
});
