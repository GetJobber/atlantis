import { Platform } from "react-native";
import { androidTokens, iosTokens } from "@jobber/design";

/**
 * These design tokens don't react to theme changes. Only use these if you need to access
 * tokens that are not affected by the current theme, otherwise you should be using our
 * useAtlantisTheme() hook to access the current theme's tokens.
 */
export const tokens: typeof iosTokens = Platform.select({
  ios: () => iosTokens,
  android: () => androidTokens,
  default: () => androidTokens,
})();
