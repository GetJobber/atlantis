import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const modalBorderRadius = tokens["radius-base"];
const titleOffsetFromHandle = tokens["space-base"];

export const styles = StyleSheet.create({
  handle: {
    width: tokens["space-largest"],
    height: tokens["space-smaller"] + tokens["space-smallest"],
    backgroundColor: tokens["color-border"],
    top: tokens["space-small"],
    borderRadius: tokens["radius-circle"],
  },

  overlay: {
    backgroundColor: tokens["color-overlay"],
  },

  modal: {
    borderTopLeftRadius: modalBorderRadius,
    borderTopRightRadius: modalBorderRadius,
  },

  modalForLargeScreens: {
    width: 640,
    alignSelf: "center",
  },

  header: {
    flexDirection: "row",
    backgroundColor: tokens["color-surface"],
    paddingTop: titleOffsetFromHandle,
    zIndex: tokens["elevation-base"],
    borderTopLeftRadius: modalBorderRadius,
    borderTopRightRadius: modalBorderRadius,
    minHeight: tokens["space-extravagant"],
  },

  headerShadow: {
    ...tokens["shadow-base"],
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
});
