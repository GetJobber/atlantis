import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: { flex: 1 },
  actionBar: {
    flexDirection: "row",
    height: 45,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#dedede",
    zIndex: 2,
  },
  pickerContainer: {
    justifyContent: "center",
    backgroundColor: "#d0d4da",
  },
  androidPickerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    color: "transparent",
    backgroundColor: "transparent",
    opacity: 0,
  },
});
