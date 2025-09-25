import { fireEvent, renderHook } from "@testing-library/react";
import { useWindowDimensions } from "./useWindowDimensions";

describe("useWindowDimensions", () => {
  it("should return window dimensions", () => {
    window.innerHeight = 100;
    window.innerWidth = 1000;

    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current).toEqual({ width: 1000, height: 100 });
  });

  describe("resize event", () => {
    it("should return window dimensions after resize", () => {
      window.innerHeight = 100;
      window.innerWidth = 1000;

      const { result } = renderHook(() => useWindowDimensions());

      window.innerWidth = 500;

      fireEvent(window, new Event("resize"));

      expect(result.current).toEqual({ width: 500, height: 100 });
    });
  });
});
