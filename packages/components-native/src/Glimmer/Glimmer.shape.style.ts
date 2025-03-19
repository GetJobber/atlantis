import { buildThemedStyles } from "../AtlantisThemeContext";

export const useShapeStyles = buildThemedStyles(tokens => {
  return {
    rectangle: {
      width: "100%",
    },
    square: {
      width: "auto",
      aspectRatio: 1 / 1,
    },
    circle: {
      width: "auto",
      aspectRatio: 1 / 1,
      borderRadius: tokens["radius-circle"],
    },
  };
});
