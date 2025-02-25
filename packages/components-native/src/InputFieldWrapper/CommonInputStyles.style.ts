import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import {
  AtlantisThemeContextValue,
  buildThemedStyles,
} from "../AtlantisThemeContext";
import {
  getTypographyStyles,
  // eslint-disable-next-line import/no-deprecated
  typographyStyles as staticTypographyStyles,
} from "../Typography";
import { tokens as staticTokens } from "../utils/design";

export const createCommonInputTokens = (
  tokens: AtlantisThemeContextValue["tokens"] | typeof staticTokens,
  typographyStyles: Record<string, TextStyle>,
): Record<string, ViewStyle | TextStyle> => ({
  input: {
    width: "100%" as const,
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
});

/**
 * @deprecated Use useCommonInputStyles instead
 */
export const commonInputStyles = StyleSheet.create(
  // eslint-disable-next-line import/no-deprecated
  createCommonInputTokens(staticTokens, staticTypographyStyles),
);

export const getCommonInputStyles = (
  tokens: AtlantisThemeContextValue["tokens"],
) => {
  const typographyStyles = getTypographyStyles(tokens);

  return createCommonInputTokens(tokens, typographyStyles);
};

export const useCommonInputStyles = buildThemedStyles(tokens => {
  return getCommonInputStyles(tokens);
});
