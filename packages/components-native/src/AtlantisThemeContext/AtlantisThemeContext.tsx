import { androidTokens, darkTokens, iosTokens } from "@jobber/design";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import merge from "lodash/merge";
import { Platform } from "react-native";
import {
  AtlantisThemeContextProviderProps,
  AtlantisThemeContextValue,
  Theme,
} from "./types";

const lightTokens = Platform.select({
  ios: () => iosTokens,
  android: () => androidTokens,
  default: () => androidTokens,
})();

const completeDarkTokens = merge({}, lightTokens, darkTokens);

const AtlantisThemeContext = createContext<AtlantisThemeContextValue>({
  theme: "light",
  tokens: lightTokens,
});

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
  // TODO: check initial theme from local/device storage?
  // const initialTheme: Theme = (globalThis.document.documentElement.dataset.theme as Theme) ?? "light";
  const initialTheme: Theme = "light";

  const [internalTheme] = useState<Theme>(initialTheme);
  const currentTokens =
    internalTheme === "dark" ? completeDarkTokens : lightTokens;

  // TODO: listen for global theme update -> setInternalTheme
  // See web's AtlantisThemeContext for an example of how it does this.

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
    dangerouslyOverrideTheme === "dark" ? completeDarkTokens : lightTokens;

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: dangerouslyOverrideTheme,
        tokens: currentTokens,
      }}
    >
      {children}
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}
