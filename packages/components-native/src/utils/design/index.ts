import { Platform } from "react-native";
import AndroidTokens from "./tokens.android";
import IOSTokens from "./tokens.ios";

export const tokens: typeof AndroidTokens = Platform.select({
  ios: () => IOSTokens,
  android: () => AndroidTokens,
  default: () => AndroidTokens,
})();
