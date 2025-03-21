import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const checkboxDimensions = tokens["space-large"] + tokens["space-smaller"];

  return {
    container: {
      width: "100%",
    },

    checkBoxContainer: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: tokens["space-small"],
    },

    label: {
      flex: 1,
    },

    checkbox: {
      borderRadius: tokens["radius-base"],
      borderWidth: tokens["border-thick"],
      justifyContent: "flex-end",
      width: checkboxDimensions,
      height: checkboxDimensions,
      marginLeft: tokens["space-smaller"],
      borderColor: tokens["color-interactive"],
    },

    disabledCheckbox: {
      borderColor: tokens["color-disabled"],
    },
  };
});
