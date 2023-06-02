import { StyleSheet } from "react-native";
import { commonInputStyles } from "../InputFieldWrapper";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: StyleSheet.flatten([
    commonInputStyles.container,
    {
      flexDirection: "column",
      justifyContent: "flex-end",
      minHeight: tokens["space-largest"] + tokens["border-base"],
    },
  ]),

  input: StyleSheet.flatten([
    commonInputStyles.input,
    {
      flexDirection: "row",
      flexGrow: 0,
      paddingBottom: tokens["space-smaller"],
      minHeight: 0,
      minWidth: "100%",
    },
  ]),

  value: {
    flexGrow: 1,
    flexShrink: 1,
  },

  icon: {
    flexGrow: 0,
    flexShrink: 0,
  },

  invalid: {
    color: tokens["color-critical"],
    borderColor: tokens["color-critical"],
  },

  errorMessageWrapperIcon: {
    flex: 0,
    flexBasis: "auto",
    paddingTop: tokens["space-minuscule"],
    paddingRight: tokens["space-smaller"],
  },
  messageWrapper: {
    paddingTop: tokens["space-smaller"],
    flexDirection: "row",
  },
});
