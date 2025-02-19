import { Platform } from "react-native";
import { androidTokens, iosTokens } from "@jobber/design";

// TODO: remove all references to const in JM and Atlantis. Replace with useAtlantisTheme.
// Rename to `nonThemedTokens` in the meantime?
export const tokens: typeof iosTokens = Platform.select({
  ios: () => iosTokens,
  android: () => androidTokens,
  default: () => androidTokens,
})();
