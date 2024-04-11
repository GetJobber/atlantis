import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const shapeStyles = StyleSheet.create({
  rectangle: {
    width: "100%",
  },
  square: {
    width: "auto",
    aspectRatio: 1 / 1,
  },
  circle: {
    width: "auto",
    aspectRatio: 1 / 1,
    borderRadius: tokens["radius-circle"],
  },
});
