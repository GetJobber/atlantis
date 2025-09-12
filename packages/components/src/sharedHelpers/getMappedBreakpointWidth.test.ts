import type { AtlantisBreakpoints } from "./getMappedBreakpointWidth";
import { getMappedBreakpointWidth } from "./getMappedBreakpointWidth";

describe("getMappedBreakpointWidth", () => {
  describe("when maxWidth is a number", () => {
    it("should return the number with px suffix", () => {
      expect(getMappedBreakpointWidth(100)).toBe("100px");
      expect(getMappedBreakpointWidth(0)).toBe("0px");
      expect(getMappedBreakpointWidth(1440)).toBe("1440px");
    });

    it("should handle negative numbers", () => {
      expect(getMappedBreakpointWidth(-50)).toBe("-50px");
    });

    it("should handle decimal numbers", () => {
      expect(getMappedBreakpointWidth(123.45)).toBe("123.45px");
    });
  });

  describe("when maxWidth is a valid breakpoint key", () => {
    it("should return the correct pixel value for sm breakpoint", () => {
      expect(getMappedBreakpointWidth("sm")).toBe("490px");
    });

    it("should return the correct pixel value for md breakpoint", () => {
      expect(getMappedBreakpointWidth("md")).toBe("768px");
    });

    it("should return the correct pixel value for lg breakpoint", () => {
      expect(getMappedBreakpointWidth("lg")).toBe("1080px");
    });

    it("should return the correct pixel value for xl breakpoint", () => {
      expect(getMappedBreakpointWidth("xl")).toBe("1440px");
    });
  });

  describe("when maxWidth is an invalid breakpoint key", () => {
    it("should return the string as-is for unknown breakpoint keys", () => {
      expect(
        getMappedBreakpointWidth("unknown" as keyof typeof AtlantisBreakpoints),
      ).toBe("unknown");
      expect(
        getMappedBreakpointWidth("xxl" as keyof typeof AtlantisBreakpoints),
      ).toBe("xxl");
    });
  });

  describe("when maxWidth is an arbitrary string", () => {
    it("should return CSS values as-is", () => {
      expect(getMappedBreakpointWidth("100%")).toBe("100%");
      expect(getMappedBreakpointWidth("50vw")).toBe("50vw");
      expect(getMappedBreakpointWidth("auto")).toBe("auto");
      expect(getMappedBreakpointWidth("inherit")).toBe("inherit");
      expect(getMappedBreakpointWidth("calc(100% - 20px)")).toBe(
        "calc(100% - 20px)",
      );
    });

    it("should handle empty string", () => {
      expect(getMappedBreakpointWidth("")).toBe("");
    });

    it("should handle strings that look like numbers but aren't", () => {
      expect(getMappedBreakpointWidth("100px")).toBe("100px");
      expect(getMappedBreakpointWidth("123")).toBe("123");
    });
  });
});
