import { darkTokens, tokens } from "@jobber/design";
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import styles from "./AtlantisThemeContext.css";

export const atlantisThemeContextDefaultValues: AtlantisThemeContextValue = {
  theme: "light",
  tokens: tokens,
};

const actualDarkTokens = merge({}, tokens, darkTokens);

const AtlantisThemeContext = createContext(atlantisThemeContextDefaultValues);

export function AtlantisThemeContextProvider({
  children,
  dangerouslyForceThemeForProvider,
}: AtlantisThemeContextProviderProps) {
  if (dangerouslyForceThemeForProvider) {
    return (
      <InternalStaticThemeProvider
        dangerouslyForceThemeForProvider={dangerouslyForceThemeForProvider}
      >
        {children}
      </InternalStaticThemeProvider>
    );
  }

  return (
    <InternalDynamicThemeProvider>{children}</InternalDynamicThemeProvider>
  );
}

function InternalDynamicThemeProvider({ children }: PropsWithChildren) {
  const initialTheme: Theme =
    (globalThis.document.documentElement.dataset.theme as Theme) ?? "light";

  const [internalTheme, setInternalTheme] = useState<Theme>(initialTheme);
  const currentTokens = initialTheme === "dark" ? actualDarkTokens : tokens;

  const handleThemeChangeEvent = useCallback((event: Event) => {
    const newTheme = (event as CustomEvent<ThemeChangeDetails>).detail.theme;
    setInternalTheme(newTheme);
  }, []);

  useEffect(() => {
    if (!globalThis.window) return;
    globalThis.window.addEventListener(
      THEME_CHANGE_EVENT,
      handleThemeChangeEvent,
    );

    return () => {
      if (!globalThis.window) return;
      globalThis.window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChangeEvent,
      );
    };
  }, [handleThemeChangeEvent]);

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: internalTheme,
        tokens: currentTokens,
      }}
    >
      {children}
    </AtlantisThemeContext.Provider>
  );
}

function InternalStaticThemeProvider({
  dangerouslyForceThemeForProvider,
  children,
}: Required<
  Pick<
    AtlantisThemeContextProviderProps,
    "dangerouslyForceThemeForProvider" | "children"
  >
>) {
  const currentTokens =
    dangerouslyForceThemeForProvider === "dark" ? actualDarkTokens : tokens;

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: dangerouslyForceThemeForProvider,
        tokens: currentTokens,
      }}
    >
      <div
        data-theme={dangerouslyForceThemeForProvider}
        className={styles.atlantisThemeContext}
      >
        {children}
      </div>
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}
