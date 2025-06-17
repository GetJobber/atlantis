import { StyleSheet } from "react-native";
import { getCommonInputStyles } from "./CommonInputStyles.style";
import { buildThemedStyles } from "../AtlantisThemeContext";
import { getTypographyStyles } from "../Typography";

export const useStyles = buildThemedStyles(tokens => {
  const commonInputStyles = getCommonInputStyles(tokens);
  const typographyStyles = getTypographyStyles(tokens);

  return {
    container: StyleSheet.flatten([
      commonInputStyles.container,
      {
        flexDirection: "column",
      },
    ]),

    field: {
      flexDirection: "row",
      alignItems: "center",
    },

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
      display: "flex",
      justifyContent: "center",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    miniLabel: {
      top: 0,
      paddingTop: tokens["space-small"] - tokens["space-smallest"],
      backgroundColor: tokens["color-surface"],
      marginRight: tokens["space-small"],
      maxHeight:
        (typographyStyles.defaultSize.lineHeight || 0) +
        tokens["space-smaller"],
      zIndex: 1,
    },
    // Prevents the miniLabel from cutting off the ClearAction button
    miniLabelShowClearAction: {
      backgroundColor: "transparent",
    },

    disabled: {
      backgroundColor: tokens["color-disabled--secondary"],
    },

    fieldAffix: {
      flexDirection: "row",
    },

    fieldAffixMiniLabel: {
      paddingTop: tokens["space-small"] - tokens["space-smallest"],
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
      paddingRight: tokens["space-small"],
    },

    suffixLabel: {
      justifyContent: "center",
      paddingTop: tokens["space-minuscule"],
      paddingRight: tokens["space-small"],
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

    toolbar: {
      flexBasis: "100%",
      flexDirection: "row",
      gap: tokens["space-small"],
      paddingBottom: tokens["space-small"],
    },

    loadingSpinner: {
      justifyContent: "center",
      paddingRight: tokens["space-small"],
    },

    loadingGlimmers: {
      position: "absolute",
      top: tokens["space-base"],
      bottom: tokens["space-base"],
      left: 0,
      right: 0,
      gap: tokens["space-small"],
      paddingTop: tokens["space-small"],
      paddingRight: tokens["space-large"],
      backgroundColor: tokens["color-surface"],
      overflow: "hidden",
    },

    loadingGlimmersHasValue: {
      top: tokens["space-large"],
      paddingTop: tokens["space-base"] - tokens["space-smaller"],
      bottom: tokens["space-smaller"],
    },
  };
});
