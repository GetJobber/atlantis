import { darkTokens, tokens } from "@jobber/design";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import merge from "lodash/merge";
import {
  AtlantisThemeContextProviderProps,
  AtlantisThemeContextValue,
  THEME_CHANGE_EVENT,
  Theme,
} from "./types";
import { useThemeContextEventQueue } from "./useThemeContextEventQueue";
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
  const initialTheme: Theme =
    dangerouslyForceThemeForProvider ??
    (globalThis.document.documentElement.dataset.theme as Theme) ??
    "light";
  const [internalTheme, setInternalTheme] = useState<Theme>(initialTheme);
  const providerWrapperRef = useRef<HTMLDivElement>(null);

  const {
    isEmpty,
    dequeueThemeChange,
    themeChangeQueue,
    handleThemeChangeEvent,
  } = useThemeContextEventQueue();

  const currentTokens = useMemo(
    () => (internalTheme === "dark" ? actualDarkTokens : tokens),
    [internalTheme],
  );

  useEffect(() => {
    if (!globalThis.window || dangerouslyForceThemeForProvider) return;
    globalThis.window.addEventListener(
      THEME_CHANGE_EVENT,
      handleThemeChangeEvent,
    );

    return () => {
      if (!globalThis.window || dangerouslyForceThemeForProvider) return;
      globalThis.window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChangeEvent,
      );
    };
  }, [dangerouslyForceThemeForProvider, handleThemeChangeEvent]);

  useEffect(() => {
    if (isEmpty || !globalThis.document || dangerouslyForceThemeForProvider) {
      return;
    }

    const newTheme = dequeueThemeChange();
    setInternalTheme(newTheme);
    if (!providerWrapperRef.current) return;
    providerWrapperRef.current.dataset.theme = newTheme;
  }, [themeChangeQueue, dequeueThemeChange, dangerouslyForceThemeForProvider]);

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: internalTheme,
        tokens: currentTokens,
      }}
    >
      <div data-theme={internalTheme} className={styles.atlantisThemeContext}>
        {children}
      </div>
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}
