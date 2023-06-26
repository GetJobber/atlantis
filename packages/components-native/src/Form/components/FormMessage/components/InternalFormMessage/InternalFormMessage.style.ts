import { StyleSheet } from "react-native";
import { tokens } from "../../../../../utils/design";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: tokens["color-surface"],
    flex: 1,
    justifyContent: "center",
  },
  closeAction: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  scrollWrapper: { height: "100%" },
  scrollWrapperContent: { flexGrow: 1, justifyContent: "center" },
});
