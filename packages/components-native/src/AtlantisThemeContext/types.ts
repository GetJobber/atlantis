import { iosTokens } from "@jobber/design";

export interface AtlantisThemeContextValue {
  /**
   * The active theme.
   */
  readonly theme: Theme;

  /**
   * The design tokens for the current theme.
   */
  readonly tokens: typeof iosTokens;

  /**
   * Change the current theme globally.
   */
  readonly setTheme: (theme: Theme) => void;
}

export interface AtlantisThemeContextProviderProps {
  /**
   * The children to render.
   */
  readonly children: React.ReactNode;

  /**
   * Force the theme for this provider to always be the same as the provided theme. Useful for sections that should remain the same theme regardless of the rest of the application's theme.
   * This is dangerous because the children in this provider will not be able to change the theme.
   */
  readonly dangerouslyOverrideTheme?: Theme;
}

export type Theme = "light" | "dark";
