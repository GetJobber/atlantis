import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const sizeStyles = StyleSheet.create({
  smaller: { height: tokens["space-smaller"] },
  small: { height: tokens["space-small"] },
  base: { height: tokens["space-base"] },
});
