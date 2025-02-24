import { StyleSheet } from "react-native";
import { useCommonInputStyles } from "../InputFieldWrapper";
import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = () => {
  const commonInputStyles = useCommonInputStyles();

  return buildThemedStyles(tokens => ({
    container: StyleSheet.flatten([
      commonInputStyles.container,
      {
        flexDirection: "column",
        justifyContent: "center",
        minHeight: tokens["space-largest"] + tokens["space-small"],
        marginVertical: 0,
        borderWidth: 0,
      },
    ]),

    input: {
      flexDirection: "row",
      flexGrow: 0,
      paddingTop: tokens["space-smaller"],
      minHeight: 0,
      minWidth: "100%",
      paddingRight: tokens["space-small"],
    },

    value: {
      flexGrow: 1,
      flexShrink: 1,
    },

    icon: {
      position: "absolute",
      bottom: "50%",
      right: tokens["space-small"],
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
  }))();
};
