import { buildThemedStyles } from "../AtlantisThemeContext";

export const useVerticalStyles = buildThemedStyles(tokens => {
  return {
    base: {
      margin: 0,
      height: "100%",
      width: 1,
      borderRightWidth: tokens["border-base"],
      borderRightColor: tokens["color-border"],
    },
    large: {
      borderRightWidth: tokens["border-thick"],
      opacity: 0.875,
    },
    larger: {
      borderRightWidth: tokens["border-thicker"],
      opacity: 0.625,
    },
    largest: {
      borderRightWidth: tokens["border-thickest"],
      opacity: 0.375,
    },
    vertical: {
      borderRightColor: tokens["color-border"],
    },
  };
});
