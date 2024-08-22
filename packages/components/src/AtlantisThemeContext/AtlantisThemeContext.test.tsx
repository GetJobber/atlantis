import React from "react";
import { act, renderHook, screen } from "@testing-library/react";
import { darkTokens, webTokens } from "@jobber/design";
import merge from "lodash/merge";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "./AtlantisThemeContext";
import { AtlantisThemeContextProviderProps, Theme } from "./types";
import { updateTheme } from "./updateTheme";
import { InlineLabel } from "../InlineLabel";

const expectedDarkTokens = merge({}, webTokens, darkTokens);
const expectedLightTokens = webTokens;

describe("ThemeContext", () => {
  function TestWrapper({
    children,
    dangerouslyOverrideTheme,
  }: AtlantisThemeContextProviderProps) {
    return (
      <div data-testid="test-wrapper">
        <AtlantisThemeContextProvider
          dangerouslyOverrideTheme={dangerouslyOverrideTheme}
        >
          <InlineLabel color="red">Past due</InlineLabel>
          {children}
        </AtlantisThemeContextProvider>
      </div>
    );
  }

  it("should provide the default theme and tokens", () => {
    const results = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <TestWrapper {...props} />
      ),
    });

    expect(results.result.current.theme).toBe("light");
    expect(results.result.current.tokens).toEqual(expectedLightTokens);
  });

  it("should update the theme and tokens", () => {
    const results = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <TestWrapper {...props} />
      ),
    });

    const rootHTMLElement =
      screen.getByTestId("test-wrapper").ownerDocument?.documentElement;

    act(() => updateTheme("dark"));

    expect(results.result.current.theme).toBe("dark");
    expect(results.result.current.tokens).toEqual(expectedDarkTokens);
    expect(rootHTMLElement?.dataset.theme).toBe("dark");

    act(() => updateTheme("light"));
    expect(results.result.current.theme).toBe("light");
    expect(results.result.current.tokens).toEqual(expectedLightTokens);
    expect(rootHTMLElement?.dataset.theme).toBe("light");
  });

  it("should update the theme and tokens for all theme providers", () => {
    const firstProvider = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <TestWrapper {...props} />
      ),
    });
    const secondProvider = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <TestWrapper {...props} />
      ),
    });

    act(() => updateTheme("dark"));

    expect(firstProvider.result.current.theme).toBe("dark");
    expect(firstProvider.result.current.tokens).toEqual(expectedDarkTokens);
    expect(secondProvider.result.current.theme).toBe("dark");
    expect(secondProvider.result.current.tokens).toEqual(expectedDarkTokens);
  });

  describe("when theme is forced for provider", () => {
    it("should add a data-theme attribute for the overriden theme to the wrapping element", () => {
      renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} dangerouslyOverrideTheme="dark" />
        ),
      });
      const wrapper = screen.getByTestId("test-wrapper");
      expect(wrapper.firstElementChild?.getAttribute("data-theme")).toEqual(
        "dark",
      );

      act(() => updateTheme("light"));

      expect(wrapper.firstElementChild?.getAttribute("data-theme")).toEqual(
        "dark",
      );
    });

    it("should not update the theme for other providers", () => {
      const firstProvider = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} />
        ),
      });
      const secondProvider = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} dangerouslyOverrideTheme="dark" />
        ),
      });

      expect(firstProvider.result.current.theme).toBe("light");
      expect(firstProvider.result.current.tokens).toEqual(expectedLightTokens);

      expect(secondProvider.result.current.theme).toBe("dark");
      expect(secondProvider.result.current.tokens).toEqual(expectedDarkTokens);
    });

    it("should ignore updates to the theme", () => {
      const results = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} dangerouslyOverrideTheme="light" />
        ),
      });

      act(() => updateTheme("dark"));

      expect(results.result.current.theme).toBe("light");
      expect(results.result.current.tokens).toEqual(expectedLightTokens);
    });

    it.each([
      { defaultTheme: "light", expectedTokens: expectedLightTokens },
      { defaultTheme: "dark", expectedTokens: expectedDarkTokens },
    ] as { defaultTheme: Theme; expectedTokens: typeof webTokens }[])(
      "should provide the dangerouslyOverrideTheme $defaultTheme tokens",
      ({ defaultTheme, expectedTokens }) => {
        const results = renderHook(useAtlantisTheme, {
          wrapper: (props: AtlantisThemeContextProviderProps) => (
            <TestWrapper {...props} dangerouslyOverrideTheme={defaultTheme} />
          ),
        });

        const currentTheme = results.result.current.theme;
        const currentTokens = results.result.current.tokens;
        expect(currentTheme).toBe(defaultTheme);
        expect(currentTokens).toEqual(expectedTokens);
      },
    );
  });
});
