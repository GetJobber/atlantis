import { renderHook } from "@testing-library/react";
import random from "lodash/random";
import { mockViewportWidth } from "./mockViewportWidth";
import { BREAKPOINT_SIZES, useBreakpoints } from "./useBreakpoints";

const { cleanup, setViewportWidth } = mockViewportWidth();

afterEach(cleanup);

describe("useBreakpoints", () => {
  describe("and up", () => {
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

  describe("only", () => {
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

  describe("in between values", () => {
    function randomBreakpoint(min: number, max: number) {
      return random(min, max - 1);
    }

    it("should have the correct breakpoint values on higher than xl size screens", () => {
      setViewportWidth(randomBreakpoint(BREAKPOINT_SIZES.xl, 10000));
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        smallAndUp: true,
        mediumAndUp: true,
        largeAndUp: true,
        extraLargeAndUp: true,

        mediumAndDown: false,
        largeAndDown: false,
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

        mediumAndDown: false,
        largeAndDown: true,
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

        mediumAndDown: true,
        largeAndDown: true,
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

        mediumAndDown: true,
        largeAndDown: true,
      });
    });
  });

  describe("and down", () => {
    it("should have the correct breakpoint values on xl size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.xl);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        mediumAndDown: false,
        largeAndDown: false,
      });
    });

    it("should have the correct breakpoint values on lg size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.lg);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        mediumAndDown: false,
        largeAndDown: true,
      });
    });

    it("should have the correct breakpoint values on md size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.md);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        mediumAndDown: true,
        largeAndDown: true,
      });
    });

    it("should have the correct breakpoint values on sm size screens", () => {
      setViewportWidth(BREAKPOINT_SIZES.sm);
      const { result } = renderHook(useBreakpoints);

      expect(result.current).toMatchObject({
        mediumAndDown: true,
        largeAndDown: true,
      });
    });
  });
});
