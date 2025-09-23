import type { Theme, ThemeChangeDetails } from "./types";
import { THEME_CHANGE_EVENT } from "./types";

/**
 * Toggle the theme of the application. If subscribed, the tokens will be updated accordingly.
 * Will add data-theme="<newTheme>" to the <html> element.
 * Will dispatch a custom event "atlantis.toggle-theme" with the new theme for other providers to subscribe to.
 */
export function updateTheme(theme: Theme) {
  if (!globalThis.window) return;

  const event = new CustomEvent<ThemeChangeDetails>(THEME_CHANGE_EVENT, {
    detail: { theme },
  });
  globalThis.document.documentElement.setAttribute("data-theme", theme);
  globalThis.window.dispatchEvent(event);
}
