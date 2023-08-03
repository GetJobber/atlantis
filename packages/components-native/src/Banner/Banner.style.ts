import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  error: {
    backgroundColor: tokens["color-critical--surface"],
  },
  warning: {
    backgroundColor: tokens["color-warning--surface"],
  },
  notice: {
    backgroundColor: tokens["color-informative--surface"],
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "flex-start", // top of container
  },
  prefixContainer: {
    marginRight: tokens["space-smallest"],
  },
  textContainer: {
    flex: 1, // take up all available space and wrap
    marginTop: tokens["space-smallest"],
  },
  fieldAffix: {
    flexDirection: "row",
    alignItems: "center", // to center vertically hopefully
  },
  prefixIcon: {
    // justifyContent: "center",
    paddingRight: tokens["space-small"],
  },
  // textContainer: {
  //   marginTop: tokens["space-smallest"],
  // },
});
