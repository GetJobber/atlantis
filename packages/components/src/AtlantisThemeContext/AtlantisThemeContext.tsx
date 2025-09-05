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

  const cssVariableOverrides = overrideTokens
    ? getCssVariableOverrides(overrideTokens)
    : undefined;

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: internalTheme,
        tokens: mergedTokens,
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
  overrideTokens,
}: Required<
  Pick<
    AtlantisThemeContextProviderProps,
    "dangerouslyOverrideTheme" | "children"
  > & {
    readonly overrideTokens: OverrideTokens | undefined;
  }
>) {
  const currentTokens =
    dangerouslyOverrideTheme === "dark" ? actualDarkTokens : tokens;

  const mergedTokens = useMemo(() => {
    if (overrideTokens) {
      return merge({}, currentTokens, overrideTokens);
    }

    return currentTokens;
  }, [dangerouslyOverrideTheme, currentTokens, overrideTokens]);

  const cssVariableOverrides = overrideTokens
    ? getCssVariableOverrides(overrideTokens)
    : undefined;

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: dangerouslyOverrideTheme,
        tokens: mergedTokens,
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
