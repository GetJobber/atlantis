import { JobberStyle as mobileFoundationBase } from "@jobber/design/foundation.native";
import { Platform } from "react-native";

export const JobberStyle: typeof mobileFoundationBase = Platform.select({
  ios: () => require("@jobber/design/foundation.ios").JobberStyle,
  android: () => require("@jobber/design/foundation.android").JobberStyle,
  default: () => require("@jobber/design/foundation.native").JobberStyle,
})();
