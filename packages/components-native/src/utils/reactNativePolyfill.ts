import * as RN from "react-native";

export function PlatformColor(
  ...colors: string[]
): RN.OpaqueColorValue | undefined {
  if (RN.PlatformColor) {
    return RN.PlatformColor(...colors);
  }

  // Polyfill for storybook (react-native-web)
  return undefined;
}
