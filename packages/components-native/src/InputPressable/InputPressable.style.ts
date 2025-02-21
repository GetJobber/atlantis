import { buildThemedStyles } from "../AtlantisThemeContext";
import { typographyStyles } from "../Typography/Typography.style";

export const useStyles = buildThemedStyles(tokens => {
  return {
    pressable: {
      flex: 1,
    },

    inputPressableStyles: {
      paddingTop:
        (typographyStyles.defaultSize.fontSize || 0) +
        tokens["space-small"] +
        tokens["space-smaller"],
      lineHeight: typographyStyles.defaultSize.lineHeight,
    },

    inputEmpty: {
      paddingTop: 0,
    },

    inputDisabled: {
      color: typographyStyles.disabled.color,
    },

    inputInvalid: {
      borderColor: tokens["color-critical"],
    },
  };
});
