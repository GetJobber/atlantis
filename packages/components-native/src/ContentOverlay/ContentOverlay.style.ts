import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const modalBorderRadius = tokens["radius-larger"];

  return {
    handleWrapper: {
      paddingBottom: tokens["space-smallest"],
      paddingTop: tokens["space-small"],
    },

    handle: {
      width: tokens["space-largest"],
      height: tokens["space-smaller"] + tokens["space-smallest"],
      backgroundColor: tokens["color-border"],
      borderRadius: tokens["radius-circle"],
    },

    backdrop: {
      backgroundColor: tokens["color-overlay"],
    },

    background: {
      borderTopLeftRadius: modalBorderRadius,
      borderTopRightRadius: modalBorderRadius,
    },

    modalForLargeScreens: {
      width: 640,
      alignSelf: "center",
    },

    header: {
      flexDirection: "row",
      zIndex: tokens["elevation-base"],
      minHeight: tokens["space-extravagant"] - tokens["space-base"],
      borderTopLeftRadius: modalBorderRadius,
      borderTopRightRadius: modalBorderRadius,
    },

    headerShadow: {
      ...tokens["shadow-base"],
      position: "absolute",
      top: -20,
      height: 20,
      width: "100%",
    },

    childrenStyle: {
      // We need to explicity lower the zIndex because otherwise, the modal content slides over the header shadow.
      zIndex: -1,
    },

    dismissButton: {
      alignItems: "center",
    },

    hiddenContent: {
      opacity: 0,
    },

    title: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: tokens["space-base"],
    },

    titleWithoutDismiss: {
      paddingRight: tokens["space-base"],
    },

    titleWithDismiss: {
      paddingRight: tokens["space-smaller"],
    },
  };
});
