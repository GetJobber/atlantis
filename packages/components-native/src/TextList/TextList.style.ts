import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  details: {
    flexDirection: "column",
    marginTop: tokens["space-small"],
  },
  detail: {
    flexDirection: "row",
    paddingLeft: tokens["space-small"],
  },
  detailText: {
    paddingLeft: tokens["space-small"],
    flex: 1,
  },
});
