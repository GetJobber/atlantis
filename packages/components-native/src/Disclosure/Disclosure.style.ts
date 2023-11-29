import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  countColumn: {
    paddingRight: tokens["space-base"],
  },
  titleContainer: {
    flexDirection: "row",
  },
  contentContainer: {
    paddingTop: tokens["space-small"],
  },
});
