import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const statusIndicatorDiameter = 8;

  return {
    statusIndicator: {
      borderRadius: tokens["radius-circle"],
      backgroundColor: tokens["color-success"],
      width: statusIndicatorDiameter,
      height: statusIndicatorDiameter,
    },
  };
});
