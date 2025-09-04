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
import type {
  AtlantisThemeContextProviderProps,
  AtlantisThemeContextValue,
  OverrideTokens,
  Theme,
  ThemeChangeDetails,
} from "./types";
import { THEME_CHANGE_EVENT } from "./types";
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
  overrideTokens,
}: AtlantisThemeContextProviderProps) {
  if (dangerouslyOverrideTheme) {
    return (
      <InternalStaticThemeProvider
        overrideTokens={overrideTokens}
        dangerouslyOverrideTheme={dangerouslyOverrideTheme}
      >
        {children}
      </InternalStaticThemeProvider>
    );
  }

  return (
    <InternalDynamicThemeProvider overrideTokens={overrideTokens}>
      {children}
    </InternalDynamicThemeProvider>
  );
}

function InternalDynamicThemeProvider({
  children,
  overrideTokens,
}: {
  readonly children: React.ReactNode;
  readonly overrideTokens?: OverrideTokens;
}) {
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
  const mergedTokens = useMemo(() => {
    return merge({}, currentTokens, overrideTokens);
  }, [overrideTokens, currentTokens]);

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: internalTheme,
        tokens: mergedTokens,
      }}
    >
      {overrideTokens ? (
        <AtlantisThemeContextTokenOverride overrideTokens={overrideTokens}>
          {children}
        </AtlantisThemeContextTokenOverride>
      ) : (
        children
      )}
    </AtlantisThemeContext.Provider>
  );
}

function InternalStaticThemeProvider({
  dangerouslyOverrideTheme,
  children,
  overrideTokens,
}: Required<
  Pick<
    AtlantisThemeContextProviderProps,
    "dangerouslyOverrideTheme" | "children"
  > & {
    readonly overrideTokens: OverrideTokens | undefined;
  }
>) {
  const currentTokens = useMemo(() => {
    const t = dangerouslyOverrideTheme === "dark" ? actualDarkTokens : tokens;

    if (overrideTokens) {
      return merge({}, t, overrideTokens);
    }

    return t;
  }, [dangerouslyOverrideTheme, overrideTokens]);

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
        {overrideTokens ? (
          <AtlantisThemeContextTokenOverride overrideTokens={overrideTokens}>
            {children}
          </AtlantisThemeContextTokenOverride>
        ) : (
          children
        )}
      </div>
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}

function AtlantisThemeContextTokenOverride({
  overrideTokens,
  children,
}: {
  readonly overrideTokens: OverrideTokens;
  readonly children: React.ReactNode;
}) {
  const { tokens: currentTokens } = useAtlantisTheme();
  const cssVariableStyles = useMemo(() => {
    return Object.entries(overrideTokens).reduce<Record<string, string>>(
      (cssVariables, [tokenName]) => {
        const tokenValue = String(
          currentTokens[tokenName as keyof typeof currentTokens],
        );
        cssVariables[`--${tokenName}`] = tokenValue;

        return cssVariables;
      },
      {},
    );
  }, [currentTokens, overrideTokens]);

  const style = useMemo<React.CSSProperties>(() => {
    return { display: "contents", ...cssVariableStyles };
  }, [cssVariableStyles]);

  return <span style={style}>{children}</span>;
}
