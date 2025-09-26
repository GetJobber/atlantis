import { Platform } from "react-native";

export function isEdgeToEdgeEnabled(): boolean {
  if (Platform.OS !== "android") {
    return false;
  }

  try {
    const BuildConfig = require("react-native-build-config") as {
      default?: {
        IS_EDGE_TO_EDGE_ENABLED?: boolean;
        [key: string]: unknown;
      };
      IS_EDGE_TO_EDGE_ENABLED?: boolean;
    };
    const edgeToEdgeValue =
      BuildConfig?.default?.IS_EDGE_TO_EDGE_ENABLED ??
      BuildConfig?.IS_EDGE_TO_EDGE_ENABLED;
    const result = !!edgeToEdgeValue;

    return result;
  } catch (error) {
    return false; // peer dep missing or not linked
  }
}
