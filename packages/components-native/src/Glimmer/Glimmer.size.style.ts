import { buildThemedStyles } from "../AtlantisThemeContext";

export const useSizeStyles = buildThemedStyles(tokens => {
  return {
    small: { height: tokens["space-small"] },
    base: { height: tokens["space-base"] },
    large: { height: tokens["space-large"] },
    larger: { height: tokens["space-larger"] },
    largest: { height: tokens["space-largest"] },
  };
});
