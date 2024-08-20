import React, { PropsWithChildren } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { darkTokens, webTokens } from "@jobber/design";
import merge from "lodash/merge";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "./AtlantisThemeContext";
import { Theme } from "./types";
import { updateTheme } from "./updateTheme";
import { InlineLabel } from "../InlineLabel";

const expectedDarkTokens = merge(webTokens, darkTokens);
const expectedLightTokens = webTokens;

describe("ThemeContext", () => {
  function TestWrapper({
    defaultTheme,
    children,
  }: PropsWithChildren<{ readonly defaultTheme?: Theme }>) {
    return (
      <AtlantisThemeContextProvider defaultTheme={defaultTheme}>
        <InlineLabel color="red">Past due</InlineLabel>
        {children}
      </AtlantisThemeContextProvider>
    );
  }

  it.each([
    { defaultTheme: "light", expectedTokens: expectedLightTokens },
    { defaultTheme: "dark", expectedTokens: expectedDarkTokens },
  ] as { defaultTheme: Theme; expectedTokens: typeof webTokens }[])(
    "should provide the default theme $defaultTheme tokens",
    ({ defaultTheme, expectedTokens }) => {
      const results = renderHook(useAtlantisTheme, {
        wrapper: props => (
          <TestWrapper {...props} defaultTheme={defaultTheme} />
        ),
      });

      const currentTheme = results.result.current.theme;
      const currentTokens = results.result.current.tokens;
      expect(currentTheme).toBe(defaultTheme);
      expect(currentTokens).toEqual(expectedTokens);
    },
  );

  it("should update the theme and tokens", async () => {
    const results = renderHook(useAtlantisTheme, {
      wrapper: props => <TestWrapper {...props} defaultTheme="light" />,
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
      wrapper: props => <TestWrapper {...props} defaultTheme="light" />,
    });
    const secondProvider = renderHook(useAtlantisTheme, {
      wrapper: props => <TestWrapper {...props} defaultTheme="light" />,
    });

    act(() => updateTheme("dark"));

    await waitFor(() => {
      expect(firstProvider.result.current.theme).toBe("dark");
      expect(firstProvider.result.current.tokens).toEqual(expectedDarkTokens);
      expect(secondProvider.result.current.theme).toBe("dark");
      expect(secondProvider.result.current.tokens).toEqual(expectedDarkTokens);
    });
  });

  it("should add a data-theme attribute to the documentElement", async () => {
    renderHook(useAtlantisTheme, {
      wrapper: props => <TestWrapper {...props} defaultTheme="dark" />,
    });
    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toEqual("dark");
    });

    act(() => updateTheme("light"));

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toEqual("light");
    });
  });
});
