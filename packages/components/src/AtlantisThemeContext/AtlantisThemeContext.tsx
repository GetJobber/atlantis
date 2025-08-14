import { darkTokens, tokens } from "@jobber/design";
import type { PropsWithChildren } from "react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import merge from "lodash/merge";
import { THEME_CHANGE_EVENT } from "./types";
import type {
  AtlantisThemeContextProviderProps,
  AtlantisThemeContextValue,
  type Theme,
  type ThemeChangeDetails,
} from "./types";
import styles from "./AtlantisThemeContext.module.css";

export const atlantisThemeContextDefaultValues: AtlantisThemeContextValue = {
  theme: "light",
  tokens: tokens,
};

const actualDarkTokens = merge({}, tokens, darkTokens);

const AtlantisThemeContext = createContext(atlantisThemeContextDefaultValues);

export function AtlantisThemeContextProvider({
  children,
  dangerouslyOverrideTheme,
}: AtlantisThemeContextProviderProps) {
  if (dangerouslyOverrideTheme) {
    return (
      <InternalStaticThemeProvider
        dangerouslyOverrideTheme={dangerouslyOverrideTheme}
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
  const currentTokens = internalTheme === "dark" ? actualDarkTokens : tokens;

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
  dangerouslyOverrideTheme,
  children,
}: Required<
  Pick<
    AtlantisThemeContextProviderProps,
    "dangerouslyOverrideTheme" | "children"
  >
>) {
  const currentTokens =
    dangerouslyOverrideTheme === "dark" ? actualDarkTokens : tokens;

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: dangerouslyOverrideTheme,
        tokens: currentTokens,
      }}
    >
      <div
        data-theme={dangerouslyOverrideTheme}
        className={styles.staticThemeProviderWrapper}
      >
        {children}
      </div>
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}
