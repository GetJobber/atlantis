import { darkTokens, tokens } from "@jobber/design";
import type { CSSProperties } from "react";
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
  dangerouslyOverrideTokens,
}: AtlantisThemeContextProviderProps) {
  if (dangerouslyOverrideTheme) {
    return (
      <InternalStaticThemeProvider
        dangerouslyOverrideTokens={dangerouslyOverrideTokens}
        dangerouslyOverrideTheme={dangerouslyOverrideTheme}
      >
        {children}
      </InternalStaticThemeProvider>
    );
  }

  return (
    <InternalDynamicThemeProvider
      dangerouslyOverrideTokens={dangerouslyOverrideTokens}
    >
      {children}
    </InternalDynamicThemeProvider>
  );
}

function InternalDynamicThemeProvider({
  children,
  dangerouslyOverrideTokens,
}: {
  readonly children: React.ReactNode;
  readonly dangerouslyOverrideTokens: OverrideTokens | undefined;
}) {
  const initialTheme: Theme =
    (globalThis.document.documentElement.dataset.theme as Theme) ?? "light";

  const [internalTheme, setInternalTheme] = useState<Theme>(initialTheme);
  const { finalTokens, cssVariableOverrides } = useTokens(
    internalTheme,
    dangerouslyOverrideTokens,
  );

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
        tokens: finalTokens,
        overrideTokens: dangerouslyOverrideTokens,
      }}
    >
      {cssVariableOverrides ? (
        <div
          className={styles.overrideTokensWrapper}
          style={cssVariableOverrides}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </AtlantisThemeContext.Provider>
  );
}

function InternalStaticThemeProvider({
  dangerouslyOverrideTheme,
  children,
  dangerouslyOverrideTokens,
}: Required<
  Pick<
    AtlantisThemeContextProviderProps,
    "dangerouslyOverrideTheme" | "children"
  > & {
    readonly dangerouslyOverrideTokens: OverrideTokens | undefined;
  }
>) {
  const { finalTokens, cssVariableOverrides } = useTokens(
    dangerouslyOverrideTheme,
    dangerouslyOverrideTokens,
  );

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: dangerouslyOverrideTheme,
        tokens: finalTokens,
        overrideTokens: dangerouslyOverrideTokens,
      }}
    >
      <div
        data-theme={dangerouslyOverrideTheme}
        className={styles.staticThemeProviderWrapper}
        style={cssVariableOverrides}
      >
        {children}
      </div>
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}

function getCssVariableOverrides(
  overrideTokens: OverrideTokens,
): CSSProperties {
  const cssVariables = Object.entries(overrideTokens).reduce<CSSProperties>(
    (variables, [tokenName, tokenValue]) => {
      // @ts-expect-error - css variables are valid keys for style objects. @types/react may be outdated.
      variables[`--${tokenName}`] = tokenValue;

      return variables;
    },
    {},
  );

  return cssVariables;
}

function useTokens(theme: Theme, overrideTokens: OverrideTokens | undefined) {
  const currentTokens = theme === "dark" ? actualDarkTokens : tokens;

  const finalTokens = useMemo(() => {
    if (overrideTokens) {
      return merge({}, currentTokens, overrideTokens);
    }

    return currentTokens;
  }, [currentTokens, overrideTokens]);

  const cssVariableOverrides = overrideTokens
    ? getCssVariableOverrides(overrideTokens)
    : undefined;

  return {
    finalTokens,
    cssVariableOverrides,
  };
}
