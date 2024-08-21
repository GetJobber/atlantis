import { tokens } from "@jobber/design";
import { PropsWithChildren } from "react";

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
   * Force the theme for this provider to always be the same as the provided defaultTheme.
   */
  readonly forceThemeForProvider?: boolean;

  /**
   * The default theme to use.
   * @default "light"
   */
  readonly defaultTheme?: Theme;
}

export type Theme = "light" | "dark";

export interface ThemeChangeDetails {
  theme: Theme;
}

export const THEME_CHANGE_EVENT = "atlantis.toggle-theme";
