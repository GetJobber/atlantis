import React from "react";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { darkTokens, webTokens } from "@jobber/design";
import merge from "lodash/merge";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "./AtlantisThemeContext";
import { AtlantisThemeContextProviderProps, Theme } from "./types";
import { updateTheme } from "./updateTheme";
import { InlineLabel } from "../InlineLabel";

const expectedDarkTokens = merge(webTokens, darkTokens);
const expectedLightTokens = webTokens;

describe("ThemeContext", () => {
  function TestWrapper({
    children,
    dangerouslyForceThemeForProvider,
  }: AtlantisThemeContextProviderProps) {
    return (
      <div data-testid="test-wrapper">
        <AtlantisThemeContextProvider
          dangerouslyForceThemeForProvider={dangerouslyForceThemeForProvider}
        >
          <InlineLabel color="red">Past due</InlineLabel>
          {children}
        </AtlantisThemeContextProvider>
      </div>
    );
  }

  it("should update the theme and tokens", async () => {
    const results = renderHook(useAtlantisTheme, {
      wrapper: (props: AtlantisThemeContextProviderProps) => (
        <TestWrapper {...props} />
      ),
    });

    const currentTheme = results.result.current.theme;
    expect(currentTheme).toBe("light");

    act(() => updateTheme("dark"));
    await waitFor(() => {
      expect(results.result.current.theme).toBe("dark");
      expect(results.result.current.tokens).toEqual(expectedDarkTokens);
    });

    act(() => updateTheme("light"));
    await waitFor(() => {
      expect(results.result.current.theme).toBe("light");
      expect(results.result.current.tokens).toEqual(expectedLightTokens);
    });
  });

  it("should update the theme and tokens for all theme providers", async () => {
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

    await waitFor(() => {
      expect(firstProvider.result.current.theme).toBe("dark");
      expect(firstProvider.result.current.tokens).toEqual(expectedDarkTokens);
      expect(secondProvider.result.current.theme).toBe("dark");
      expect(secondProvider.result.current.tokens).toEqual(expectedDarkTokens);
    });
  });

  describe("when theme is forced for provider", () => {
    it("should add a data-theme attribute to the wrapping element", async () => {
      renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} dangerouslyForceThemeForProvider="dark" />
        ),
      });
      await waitFor(() => {
        const wrapper = screen.getByTestId("test-wrapper");
        expect(wrapper.firstElementChild?.getAttribute("data-theme")).toEqual(
          "dark",
        );
      });

      act(() => updateTheme("light"));
    });

    it("should not update the theme for other providers", async () => {
      const firstProvider = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} />
        ),
      });
      const secondProvider = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} dangerouslyForceThemeForProvider="dark" />
        ),
      });

      await waitFor(() => {
        expect(firstProvider.result.current.theme).toBe("light");
        expect(firstProvider.result.current.tokens).toEqual(
          expectedLightTokens,
        );
        expect(secondProvider.result.current.theme).toBe("dark");
        expect(secondProvider.result.current.tokens).toEqual(
          expectedDarkTokens,
        );
      });
    });

    it("should ignore updates to the theme", async () => {
      const results = renderHook(useAtlantisTheme, {
        wrapper: (props: AtlantisThemeContextProviderProps) => (
          <TestWrapper {...props} dangerouslyForceThemeForProvider="light" />
        ),
      });

      act(() => updateTheme("dark"));

      await waitFor(() => {
        expect(results.result.current.theme).toBe("light");
        expect(results.result.current.tokens).toEqual(expectedLightTokens);
      });
    });

    it.each([
      { defaultTheme: "light", expectedTokens: expectedLightTokens },
      { defaultTheme: "dark", expectedTokens: expectedDarkTokens },
    ] as { defaultTheme: Theme; expectedTokens: typeof webTokens }[])(
      "should provide the dangerouslyForceThemeForProvider $defaultTheme tokens",
      ({ defaultTheme, expectedTokens }) => {
        const results = renderHook(useAtlantisTheme, {
          wrapper: (props: AtlantisThemeContextProviderProps) => (
            <TestWrapper
              {...props}
              dangerouslyForceThemeForProvider={defaultTheme}
            />
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
