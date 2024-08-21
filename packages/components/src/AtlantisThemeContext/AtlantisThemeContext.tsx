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
import { updateTheme } from "./updateTheme";
import { useThemeContextEventQueue } from "./useThemeContextEventQueue";
import styles from "./AtlantisThemeContext.css";

export const atlantisThemeContextDefaultValues: AtlantisThemeContextValue = {
  theme: "light",
  tokens: tokens,
};

const AtlantisThemeContext = createContext(atlantisThemeContextDefaultValues);

export function AtlantisThemeContextProvider({
  children,
  defaultTheme = "light",
  forceThemeForProvider,
}: AtlantisThemeContextProviderProps) {
  const [internalTheme, setInternalTheme] = useState<Theme>(defaultTheme);
  const providerWrapperRef = useRef<HTMLDivElement>(null);

  const {
    isEmpty,
    dequeueThemeChange,
    themeChangeQueue,
    handleThemeChangeEvent,
  } = useThemeContextEventQueue();

  const currentTokens = useMemo(
    () => (internalTheme === "dark" ? merge(tokens, darkTokens) : tokens),
    [internalTheme],
  );

  useEffect(() => {
    if (!globalThis.window || forceThemeForProvider) return;
    globalThis.window.addEventListener(
      THEME_CHANGE_EVENT,
      handleThemeChangeEvent,
    );

    return () => {
      if (!globalThis.window || forceThemeForProvider) return;
      globalThis.window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChangeEvent,
      );
    };
  }, [forceThemeForProvider, handleThemeChangeEvent]);

  useEffect(() => {
    if (isEmpty || !globalThis.document || forceThemeForProvider) {
      return;
    }

    const newTheme = dequeueThemeChange();
    globalThis.document.documentElement.dataset.theme = newTheme;
    if (!providerWrapperRef.current) return;
    providerWrapperRef.current.dataset.theme = newTheme;
    setInternalTheme(newTheme);
  }, [themeChangeQueue, dequeueThemeChange, forceThemeForProvider]);

  useEffect(() => {
    if (!providerWrapperRef.current) return;
    providerWrapperRef.current.dataset.theme = defaultTheme;
    if (forceThemeForProvider) return;

    updateTheme(defaultTheme);
  }, [defaultTheme, forceThemeForProvider]);

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: internalTheme,
        tokens: currentTokens,
      }}
    >
      <div ref={providerWrapperRef} className={styles.atlantisThemeContext}>
        {children}
      </div>
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}
