import { tokens } from "@jobber/design";
import { PropsWithChildren } from "react";

export interface ThemeContextValue {
  /**
   * The theme of the application.
   */
  readonly theme: Theme;

  /**
   * The design tokens for the current theme.
   */
  readonly tokens: typeof tokens;
}

export interface ThemeContextProviderProps extends PropsWithChildren {
  /**
   * The children to render.
   */
  readonly children: React.ReactNode;

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
