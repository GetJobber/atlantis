import { darkTokens, tokens } from "@jobber/design";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import merge from "lodash/merge";
import {
  AtlantisThemeContextProviderProps,
  AtlantisThemeContextValue,
  THEME_CHANGE_EVENT,
  Theme,
  ThemeChangeDetails,
} from "./types";
import { setTheme } from "./setTheme";
import { useThemeContextEventQueue } from "./useThemeContextEventQueue";

export const atlantisThemeContextDefaultValues: AtlantisThemeContextValue = {
  theme: "light",
  tokens: tokens,
};

const ThemeContext = createContext(atlantisThemeContextDefaultValues);

export function AtlantisThemeContextProvider({
  children,
  defaultTheme = "light",
  ignoreThemeChanges,
}: AtlantisThemeContextProviderProps) {
  const [internalTheme, setInternalTheme] = useState<Theme>(defaultTheme);
  const { isEmpty, dequeueThemeChange, enqueueThemeChange, themeChangeQueue } =
    useThemeContextEventQueue();

  const handleThemeChange = useCallback(
    (event: Event) => {
      const newTheme = (event as CustomEvent<ThemeChangeDetails>).detail.theme;
      enqueueThemeChange(newTheme);
    },
    [enqueueThemeChange],
  );

  const currentTokens = useMemo(
    () => (internalTheme === "dark" ? merge(tokens, darkTokens) : tokens),
    [internalTheme],
  );

  useEffect(() => {
    if (!globalThis.window || ignoreThemeChanges) return;
    globalThis.window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    return () => {
      if (!globalThis.window || ignoreThemeChanges) return;
      globalThis.window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChange,
      );
    };
  }, [handleThemeChange, ignoreThemeChanges]);

  useEffect(() => {
    if (isEmpty || !globalThis.document || ignoreThemeChanges) {
      return;
    }
    const newTheme = dequeueThemeChange();
    globalThis.document.documentElement.dataset.theme = newTheme;
    setInternalTheme(newTheme);
  }, [isEmpty, themeChangeQueue, dequeueThemeChange, ignoreThemeChanges]);

  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: internalTheme,
        tokens: currentTokens,
      }}
    >
      <div data-theme={internalTheme} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(ThemeContext);
}
