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
  THEME_CHANGE_EVENT,
  Theme,
  ThemeChangeDetails,
  ThemeContextProviderProps,
  ThemeContextValue,
} from "./types";
import { setTheme } from "./setTheme";
import { useThemeContextEventQueue } from "./useThemeContextEventQueue";

export const themeContextDefaultValues: ThemeContextValue = {
  theme: "light",
  tokens: tokens,
};

const ThemeContext = createContext(themeContextDefaultValues);

export function ThemeContextProvider({
  children,
  defaultTheme = "light",
}: ThemeContextProviderProps) {
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
    globalThis.window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    return () => {
      globalThis.window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChange,
      );
    };
  }, [handleThemeChange]);

  useEffect(() => {
    if (isEmpty) {
      return;
    }
    const newTheme = dequeueThemeChange();
    globalThis.document.documentElement.dataset.theme = newTheme;
    setInternalTheme(newTheme);
  }, [isEmpty, themeChangeQueue, dequeueThemeChange]);

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
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
