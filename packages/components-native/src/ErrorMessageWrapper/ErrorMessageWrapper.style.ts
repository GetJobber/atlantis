import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    wrapper: {
      position: "relative",
      width: "100%",
    },
    wrapForCard: {
      paddingHorizontal: tokens["space-base"],
      paddingVertical: tokens["space-small"],
    },
    messageWrapper: {
      flexDirection: "row",
    },
    messageWrapperIcon: {
      flex: 0,
      flexBasis: "auto",
      paddingTop: tokens["space-minuscule"],
      paddingRight: tokens["space-smaller"],
    },
    messageWrapperContent: {
      flex: 1,
    },
    screenReaderMessage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  };
});
