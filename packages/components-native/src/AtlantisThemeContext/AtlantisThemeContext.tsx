import { androidTokens, darkTokens, iosTokens } from "@jobber/design";
import React, { createContext, useContext, useState } from "react";
import merge from "lodash/merge";
import { Platform } from "react-native";
import type {
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
  setTheme: () => {
    console.error(
      "useAtlantisTheme accessed outside of AtlantisThemeContextProvider",
    );
  },
});

export function AtlantisThemeContextProvider({
  children,
  dangerouslyOverrideTheme,
}: AtlantisThemeContextProviderProps) {
  // TODO: check last saved theme from local/device storage
  const initialTheme: Theme = "light";
  const [globalTheme, setGlobalTheme] = useState<Theme>(initialTheme);

  const currentTheme = dangerouslyOverrideTheme ?? globalTheme;
  const currentTokens =
    currentTheme === "dark" ? completeDarkTokens : lightTokens;

  return (
    <AtlantisThemeContext.Provider
      value={{
        theme: currentTheme,
        tokens: currentTokens,
        setTheme: setGlobalTheme,
      }}
    >
      {children}
    </AtlantisThemeContext.Provider>
  );
}

export function useAtlantisTheme() {
  return useContext(AtlantisThemeContext);
}
