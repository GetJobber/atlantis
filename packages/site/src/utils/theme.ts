import { Theme } from "@jobber/components";

const FALLBACK_THEME: Theme = "light";

/**
 * Initialize the site's theme. This checks local storage for a previously set theme,
 * else it falls back to the default "light" theme. It then sets the data-theme attribute,
 * which is what AtlantisThemeContextProvider reads upon startup.
 */
export function initAtlantisTheme() {
  const theme = getTheme() || FALLBACK_THEME;
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
