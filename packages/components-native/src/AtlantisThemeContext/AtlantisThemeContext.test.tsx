import React from "react";
import { act, renderHook } from "@testing-library/react-native";
import { darkTokens, iosTokens } from "@jobber/design";
import merge from "lodash/merge";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "./AtlantisThemeContext";
import type { AtlantisThemeContextProviderProps, Theme } from "./types";

const expectedDarkTokens = merge({}, iosTokens, darkTokens);
const expectedLightTokens = iosTokens;

function Wrapper({
  children,
  dangerouslyOverrideTheme,
}: AtlantisThemeContextProviderProps) {
  return (
    <AtlantisThemeContextProvider
      dangerouslyOverrideTheme={dangerouslyOverrideTheme}
    >
      {children}
    </AtlantisThemeContextProvider>
  );
}

function WrapperWithOverride({
  children,
  dangerouslyOverrideTheme,
}: AtlantisThemeContextProviderProps) {
  return (
    <Wrapper>
      <AtlantisThemeContextProvider
        dangerouslyOverrideTheme={dangerouslyOverrideTheme}
      >
        {children}
      </AtlantisThemeContextProvider>
    </Wrapper>
  );
}

describe("ThemeContext", () => {
  it("defaults to the light theme", () => {
    const { result } = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <Wrapper {...props} />
      ),
    });

    expect(result.current.theme).toBe("light");
    expect(result.current.tokens).toEqual(expectedLightTokens);
  });

  it("updates the theme and tokens", () => {
    const { result } = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <Wrapper {...props} />
      ),
    });

    act(() => result.current.setTheme("dark"));
    expect(result.current.theme).toBe("dark");
    expect(result.current.tokens).toEqual(expectedDarkTokens);

    act(() => result.current.setTheme("light"));
    expect(result.current.theme).toBe("light");
    expect(result.current.tokens).toEqual(expectedLightTokens);
  });

  describe("when theme is forced for provider", () => {
    it("ignores updates to the global theme", () => {
      const { result } = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <WrapperWithOverride {...props} dangerouslyOverrideTheme="light" />
        ),
      });

      // Update the global theme
      act(() => result.current.setTheme("dark"));

      // This hook shouldn't be affected by it because it's set to the light theme
      expect(result.current.theme).toBe("light");
      expect(result.current.tokens).toEqual(expectedLightTokens);
    });

    it.each([
      { defaultTheme: "light", expectedTokens: expectedLightTokens },
      { defaultTheme: "dark", expectedTokens: expectedDarkTokens },
    ] as { defaultTheme: Theme; expectedTokens: typeof iosTokens }[])(
      "provides the dangerouslyOverrideTheme $defaultTheme tokens",
      ({ defaultTheme, expectedTokens }) => {
        const { result } = renderHook(useAtlantisTheme, {
          wrapper: (props: AtlantisThemeContextProviderProps) => (
            <WrapperWithOverride
              {...props}
              dangerouslyOverrideTheme={defaultTheme}
            />
          ),
        });

        expect(result.current.theme).toBe(defaultTheme);
        expect(result.current.tokens).toEqual(expectedTokens);
      },
    );
  });
});
