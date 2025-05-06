import { type Theme } from "@jobber/components";

const FALLBACK_THEME: Theme = "light";

/**
 * Initializes the site's theme.
 *
 * This checks local storage for a previously set theme preference. If that's not set, it'll
 * apply the initial theme if provided, else it falls back to the default "light" theme.
 * It then sets the data-theme attribute, which is what AtlantisThemeContextProvider reads
 * upon startup.
 */
export function initAtlantisTheme(initialTheme: string | null) {
  const theme = getTheme() || initialTheme || FALLBACK_THEME;
  document.documentElement.dataset.theme = theme;
}

/**
 * Save the theme to local storage.
 */
export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // noop
  }
}

/**
 * Get the theme from local storage.
 */
function getTheme(): Theme | null {
  try {
    const theme = localStorage.getItem("theme");

    return theme as Theme;
  } catch (error) {
    // noop
  }

  return null;
}
