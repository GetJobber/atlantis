import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    overlay: {
      flex: 1,
    },
    actionBar: {
      flexDirection: "row",
      height: 45,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: tokens["space-small"],
      backgroundColor: tokens["color-surface--background"],
      borderTopWidth: tokens["border-base"],
      borderTopColor: tokens["color-border"],
      zIndex: 2,
    },
    pickerContainer: {
      justifyContent: "center",
      backgroundColor: tokens["color-surface--background"],
    },
    androidPickerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      color: "transparent",
      backgroundColor: "transparent",
      opacity: 0,
    },
  };
});
