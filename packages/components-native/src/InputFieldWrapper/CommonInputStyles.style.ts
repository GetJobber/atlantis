import { buildThemedStyles } from "../AtlantisThemeContext";
import { useTypographyStyles } from "../Typography";

export const useCommonInputStyles = () => {
  const typographyStyles = useTypographyStyles();

  return buildThemedStyles(tokens => ({
    input: {
      width: "100%",
      flexShrink: 1,
      flexGrow: 1,
      color: tokens["color-text"],
      fontFamily: typographyStyles.baseRegularRegular.fontFamily,
      fontSize: typographyStyles.defaultSize.fontSize,
      letterSpacing: typographyStyles.baseLetterSpacing.letterSpacing,
      minHeight: tokens["space-largest"] + tokens["space-small"],
      padding: 0,
    },

    inputEmpty: {
      paddingTop: 0,
    },

    inputDisabled: {
      color: typographyStyles.disabled.color,
    },

    container: {
      paddingLeft: tokens["space-base"],
      marginVertical: tokens["space-smaller"],
      backgroundColor: tokens["color-surface"],
      minHeight: tokens["space-largest"] + tokens["space-small"],
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      borderColor: tokens["color-border"],
      borderStyle: "solid",
      borderWidth: tokens["border-base"],
      borderRadius: tokens["radius-base"],
    },
  }))();
};
