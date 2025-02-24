import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: "100%",
      backgroundColor: tokens["color-surface"],
    },

    lowElevation: {
      ...tokens["shadow-low"],
    },

    baseElevation: {
      ...tokens["shadow-base"],
    },

    highElevation: {
      ...tokens["shadow-high"],
    },

    headerTitle: {
      flexGrow: 1,
      flex: 1,
    },

    footer: {
      height: tokens["space-largest"],
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    pressed: {
      opacity: tokens["opacity-pressed"],
    },

    actionItem: {
      height: tokens["typography--lineHeight-base"],
      justifyContent: "center",
    },

    actionLabel: {
      paddingTop: tokens["space-smallest"],
    },
  };
});
