import { buildThemedStyles } from "../AtlantisThemeContext";

export const useHorizontalStyles = buildThemedStyles(tokens => {
  return {
    base: {
      height: 1,
      margin: 0,
      width: "auto",
      borderBottomColor: tokens["color-border"],
      borderBottomWidth: tokens["border-base"],
    },
    large: {
      borderBottomWidth: tokens["border-thick"],
      opacity: 0.875,
    },
    larger: {
      borderBottomWidth: tokens["border-thicker"],
      opacity: 0.625,
    },
    largest: {
      borderBottomWidth: tokens["border-thickest"],
      opacity: 0.375,
    },
  };
});
