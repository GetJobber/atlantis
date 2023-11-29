import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    marginTop: tokens["space-base"],
    marginBottom: tokens["space-base"],
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  label: {
    flex: 1,
    justifyContent: "center",
    marginRight: tokens["space-small"],
  },
  description: {
    marginTop: tokens["space-smaller"],
  },
});
