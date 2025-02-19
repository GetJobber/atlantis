import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  statusLabelRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "nowrap",
    flexGrow: 0,
    flexShrink: 1,
    gap: tokens["space-smaller"],
    backgroundColor: tokens["color-success--surface"],
    borderRadius: tokens["radius-large"],
    paddingVertical: tokens["space-smaller"],
    paddingHorizontal: tokens["space-small"],
  },
  statusLabelText: {
    flexShrink: 1,
  },
  labelTextStartAligned: {
    flexDirection: "row-reverse",
  },
});
