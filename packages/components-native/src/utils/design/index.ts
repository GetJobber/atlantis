import { Platform } from "react-native";
import { androidTokens, iosTokens } from "@jobber/design";

export const tokens: typeof iosTokens = Platform.select({
  ios: () => iosTokens,
  android: () => androidTokens,
  default: () => androidTokens,
})();
