import { THEME_CHANGE_EVENT, Theme, ThemeChangeDetails } from "./types";

/**
 * Toggle the theme of the application. If subscribed, the tokens will be updated accordingly.
 * Will add data-theme="<newTheme>" to the <html> element.
 * Will dispatch a custom event "atlantis.toggle-theme" with the new theme for other providers to subscribe to.
 */
export function setTheme(theme: Theme) {
  const event = new CustomEvent<ThemeChangeDetails>(THEME_CHANGE_EVENT, {
    detail: { theme },
  });
  window.dispatchEvent(event);
}
