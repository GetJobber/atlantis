import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  bottomSheetOption: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: tokens["space-small"],
  },
  icon: {
    paddingHorizontal: tokens["space-small"],
  },
  title: {
    paddingHorizontal: tokens["space-small"],
    flexShrink: 1,
  },
});
