import { darkTokens, tokens } from "@jobber/design";
import React, {
  createContext,
  useCallback,
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
  ThemeChangeDetails,
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
  const { isEmpty, dequeueThemeChange, enqueueThemeChange, themeChangeQueue } =
    useThemeContextEventQueue();

  const handleThemeChange = useCallback(
    (event: Event) => {
      const newTheme = (event as CustomEvent<ThemeChangeDetails>).detail.theme;
      enqueueThemeChange(newTheme);
    },
    [enqueueThemeChange],
  );
  const updateProviderRef = useCallback((theme: Theme) => {
    if (!providerWrapperRef.current) return;
    providerWrapperRef.current.dataset.theme = theme;
  }, []);

  const currentTokens = useMemo(
    () => (internalTheme === "dark" ? merge(tokens, darkTokens) : tokens),
    [internalTheme],
  );

  useEffect(() => {
    if (!globalThis.window || forceThemeForProvider) return;
    globalThis.window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    return () => {
      if (!globalThis.window || forceThemeForProvider) return;
      globalThis.window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChange,
      );
    };
  }, [handleThemeChange, forceThemeForProvider]);

  useEffect(() => {
    if (isEmpty || !globalThis.document || forceThemeForProvider) {
      return;
    }
    const newTheme = dequeueThemeChange();
    globalThis.document.documentElement.dataset.theme = newTheme;
    setInternalTheme(newTheme);
    updateProviderRef(newTheme);
  }, [isEmpty, themeChangeQueue, dequeueThemeChange, forceThemeForProvider]);

  useEffect(() => {
    updateProviderRef(defaultTheme);
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
