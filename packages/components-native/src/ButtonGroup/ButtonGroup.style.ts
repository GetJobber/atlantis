import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  buttonGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    flexBasis: tokens["space-largest"],
    flexGrow: 1,
    paddingRight: tokens["space-small"],
  },
  moreButton: {
    flexBasis: tokens["space-largest"],
    flexGrow: 0,
  },
});
