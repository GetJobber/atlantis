import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: tokens["space-base"],
    paddingBottom: tokens["space-base"],
  },
  toast: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 540,
    paddingVertical: tokens["space-small"],
    backgroundColor: tokens["color-blue"],
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  toastMessage: {
    justifyContent: "center",
    paddingLeft: tokens["space-base"],
    paddingVertical: tokens["space-small"],
    flexShrink: 1,
  },
  toastIcon: {
    justifyContent: "center",
  },
});
