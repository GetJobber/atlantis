import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const statusLabelIconDiameter = tokens["space-base"] - tokens["space-smaller"]; //12px

const indicatorOffset = tokens["space-smallest"] + tokens["space-minuscule"];

export const styles = StyleSheet.create({
  statusLabelRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "nowrap",
  },
  statusLabelText: {
    flexShrink: 1,
  },
  statusLabelIcon: {
    borderRadius: tokens["radius-base"],
    backgroundColor: tokens["color-success"],
    width: statusLabelIconDiameter,
    height: statusLabelIconDiameter,
    marginTop: indicatorOffset,
  },
  labelTextStartAligned: {
    flexDirection: "row-reverse",
  },
  innerPad: {
    width: tokens["space-small"],
  },
});
