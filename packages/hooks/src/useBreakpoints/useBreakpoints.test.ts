import { renderHook } from "@testing-library/react";
import { mockViewportWidth } from "./mockViewportWidth";
import { BREAKPOINT_SIZES, useBreakpoints } from "./useBreakpoints";

const { cleanup, setViewportWidth } = mockViewportWidth();

afterEach(cleanup);

describe.each(["1", "2", "3", "4", "5", "6"])("useBreakpoints", () => {
  describe.each(["1", "2", "3", "4", "5", "6"])("and up", () => {
    it("should have the correct breakpoint values on xl size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.xl);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,
        largeAndUp: true,
        extraLargeAndUp: true,
      });
    });

    it("should have the correct breakpoint values on lg size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.lg);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,
        largeAndUp: true,

        extraLargeAndUp: false,
      });
    });

    it("should have the correct breakpoint values on md size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.md);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,

        largeAndUp: false,
        extraLargeAndUp: false,
      });
    });

    it("should have the correct breakpoint values on sm size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.sm);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,

        mediumAndUp: false,
        largeAndUp: false,
        extraLargeAndUp: false,
      });
    });
  });

  describe.each(["1", "2", "3", "4", "5", "6"])("only", () => {
    it("should only set the extraSmallOnly to true on smaller than sm", () => {
      setViewportWidth(BREAKPOINT_SIZES.sm - 1);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        extraSmallOnly: true,
        smallOnly: false,
        mediumOnly: false,
        largeOnly: false,
      });
    });

    it("should only set the smallOnly to true on sm", () => {
      setViewportWidth(BREAKPOINT_SIZES.sm);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        extraSmallOnly: false,
        smallOnly: true,
        mediumOnly: false,
        largeOnly: false,
      });
    });

    it("should only set the mediumOnly to true on md", () => {
      setViewportWidth(BREAKPOINT_SIZES.md);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        extraSmallOnly: false,
        smallOnly: false,
        mediumOnly: true,
        largeOnly: false,
      });
    });

    it("should only set the largeOnly to true on lg", () => {
      setViewportWidth(BREAKPOINT_SIZES.lg);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        extraSmallOnly: false,
        smallOnly: false,
        mediumOnly: false,
        largeOnly: true,
      });
    });
  });

  describe.each(["1", "2", "3", "4", "5", "6"])("in between values", () => {
    function randomBreakpoint(min: number, max: number) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }

    it("should have the correct breakpoint values on higher than xl size screens", () => {
      setViewportWidth(randomBreakpoint(BREAKPOINT_SIZES.xl, 10000));
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,
        largeAndUp: true,
        extraLargeAndUp: true,
      });
    });

    it("should have the correct breakpoint values on lg size screens", () => {
      setViewportWidth(
        randomBreakpoint(BREAKPOINT_SIZES.lg, BREAKPOINT_SIZES.xl),
      );
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,
        largeAndUp: true,

        extraLargeAndUp: false,
      });
    });

    it("should have the correct breakpoint values on md size screens", () => {
      setViewportWidth(
        randomBreakpoint(BREAKPOINT_SIZES.md, BREAKPOINT_SIZES.lg),
      );
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,

        largeAndUp: false,
        extraLargeAndUp: false,
      });
    });

    it("should have the correct breakpoint values on sm size screens", () => {
      setViewportWidth(
        randomBreakpoint(BREAKPOINT_SIZES.sm, BREAKPOINT_SIZES.md),
      );
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,

        mediumAndUp: false,
        largeAndUp: false,
        extraLargeAndUp: false,
      });
    });
  });
});
