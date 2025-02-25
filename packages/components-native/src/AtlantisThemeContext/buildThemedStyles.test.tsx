import React from "react";
import { renderHook } from "@testing-library/react-native";
import { buildThemedStyles } from "./buildThemedStyles";
import { AtlantisThemeContextProvider } from "./AtlantisThemeContext";

describe("buildThemedStyles", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AtlantisThemeContextProvider>{children}</AtlantisThemeContextProvider>
  );

  it("creates styles using theme tokens", () => {
    const useTestStyles = buildThemedStyles(tokens => ({
      container: {
        backgroundColor: tokens["color-surface"],
        padding: tokens["space-base"],
      },
    }));

    const { result } = renderHook(() => useTestStyles(), { wrapper });

    expect(result.current).toEqual({
      container: {
        backgroundColor: expect.any(String),
        padding: expect.any(Number),
      },
    });
  });

  it("memoizes styles and only updates when tokens change", () => {
    const styleFactory = jest.fn(tokens => ({
      container: {
        backgroundColor: tokens["color-surface"],
      },
    }));

    const useTestStyles = buildThemedStyles(styleFactory);

    const { result, rerender } = renderHook(() => useTestStyles(), { wrapper });

    // Initial render should call styleFactory
    expect(styleFactory).toHaveBeenCalledTimes(1);
    const initialResult = result.current;

    // Rerender without token changes should not call styleFactory again
    rerender({ wrapper });
    expect(styleFactory).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(initialResult);
  });

  it("handles empty style objects", () => {
    const useTestStyles = buildThemedStyles(() => ({}));

    const { result } = renderHook(() => useTestStyles(), { wrapper });

    expect(result.current).toEqual({});
  });
});
