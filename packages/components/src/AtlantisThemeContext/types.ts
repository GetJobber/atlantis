import type { tokens } from "@jobber/design";
import type { PropsWithChildren } from "react";

export interface AtlantisThemeContextValue {
  /**
   * The theme of the application.
   */
  readonly theme: Theme;

  /**
   * The design tokens for the current theme.
   */
  readonly tokens: typeof tokens;
}

export interface AtlantisThemeContextProviderProps extends PropsWithChildren {
  /**
   * The children to render.
   */
  readonly children: React.ReactNode;

  /**
   * Force the theme for this provider to always be the same as the provided theme. Useful for sections that should remain the same theme regardless of the rest of the application's theme.
   * This is dangerous because the children in this provider will not be able to change the theme.
   */
  readonly dangerouslyOverrideTheme?: Theme;

  /**
   * Override the design tokens with custom tokens. These tokens will be used instead of the naturally loaded tokens.
   * If provided, these tokens will be used for both light and dark themes.
   */
  readonly overrideTokens?: OverrideTokens;
}

export type OverrideTokens = {
  [K in keyof typeof tokens]?: (typeof tokens)[K];
} & {
  [customKey: string]: string | number;
};

export type Theme = "light" | "dark";

export interface ThemeChangeDetails {
  theme: Theme;
}

export const THEME_CHANGE_EVENT = "atlantis.toggle-theme";
