import { tokens as mobileFoundationBase } from "@jobber/design/foundation.native";
import { Platform } from "react-native";

export const tokens: typeof mobileFoundationBase = Platform.select({
  ios: () => require("@jobber/design/foundation.ios").tokens,
  android: () => require("@jobber/design/foundation.android").tokens,
  default: () => require("@jobber/design/foundation.native").tokens,
})();
