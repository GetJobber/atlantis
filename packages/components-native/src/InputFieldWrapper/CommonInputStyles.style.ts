import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import {
  AtlantisThemeContextValue,
  buildThemedStyles,
} from "../AtlantisThemeContext";
import { getTypographyStyles } from "../Typography";
import { tokens as staticTokens } from "../utils/design";

export const createCommonInputTokens = (
  tokens: AtlantisThemeContextValue["tokens"] | typeof staticTokens,
): Record<string, ViewStyle | TextStyle> => {
  const typographyStyles = getTypographyStyles(tokens);

  return {
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
  };
};

/**
 * @deprecated Use useCommonInputStyles instead
 */
export const commonInputStyles = StyleSheet.create(
  // eslint-disable-next-line import/no-deprecated
  createCommonInputTokens(staticTokens),
);

export const getCommonInputStyles = (
  tokens: AtlantisThemeContextValue["tokens"],
) => {
  return createCommonInputTokens(tokens);
};

export const useCommonInputStyles = buildThemedStyles(tokens => {
  return getCommonInputStyles(tokens);
});
