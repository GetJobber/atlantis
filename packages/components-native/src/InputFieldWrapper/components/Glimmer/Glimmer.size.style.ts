import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const sizeStyles = StyleSheet.create({
  small: { height: tokens["space-small"] },
  base: { height: tokens["space-base"] },
  large: { height: tokens["space-large"] },
  larger: { height: tokens["space-larger"] },
  largest: { height: tokens["space-largest"] },
});
