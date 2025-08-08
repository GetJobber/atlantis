import { calculateMaxHeight } from "./maxHeight";

jest.mock("@jobber/design", () => ({
  tokens: {
    "space-base": 16, // Typical base spacing value
  },
}));

describe("calculateMaxHeight", () => {
  describe("when available height exceeds preferred max height", () => {
    it("should return the preferred max height", () => {
      const result = calculateMaxHeight(500, {
        maxHeight: 300,
      });

      expect(result).toBe(300);
    });

    it("should return the preferred max height even with custom edge padding", () => {
      const result = calculateMaxHeight(500, {
        maxHeight: 300,
        edgePadding: 24,
      });

      expect(result).toBe(300);
    });
  });

  describe("when available height is less than preferred max height", () => {
    it("should return available height minus default edge padding", () => {
      const result = calculateMaxHeight(200, {
        maxHeight: 300,
      });

      // 200 - 16 (default edge padding) = 184
      expect(result).toBe(184);
    });

    it("should return available height minus custom edge padding", () => {
      const result = calculateMaxHeight(200, {
        maxHeight: 300,
        edgePadding: 24,
      });

      // 200 - 24 (custom edge padding) = 176
      expect(result).toBe(176);
    });

    it("should return available height minus edge padding even when small", () => {
      const result = calculateMaxHeight(120, {
        maxHeight: 300,
      });

      // 120 - 16 = 104
      expect(result).toBe(104);
    });

    it("should return available height minus custom edge padding even when small", () => {
      const result = calculateMaxHeight(120, {
        maxHeight: 300,
        edgePadding: 30,
      });

      // 120 - 30 = 90
      expect(result).toBe(90);
    });
  });

  describe("edge cases", () => {
    it("should return available height minus edge padding for small values", () => {
      const result = calculateMaxHeight(50, {
        maxHeight: 300,
      });

      // 50 - 16 = 34
      expect(result).toBe(34);
    });

    it("should clamp result to 0 when edge padding exceeds available height", () => {
      const result = calculateMaxHeight(10, {
        maxHeight: 300,
        edgePadding: 20,
      });

      // 10 - 20 = -10
      expect(result).toBe(0);
    });

    it("should handle when available height equals preferred max height", () => {
      const result = calculateMaxHeight(300, {
        maxHeight: 300,
      });

      // When available height equals max height, it uses available height minus edge padding
      // 300 - 16 = 284
      expect(result).toBe(284);
    });

    it("should handle when available height minus edge padding equals exact difference", () => {
      const result = calculateMaxHeight(116, {
        maxHeight: 300,
      });

      // 116 - 16 = 100
      expect(result).toBe(100);
    });

    it("should handle large edge padding values", () => {
      const result = calculateMaxHeight(200, {
        maxHeight: 500,
        edgePadding: 100,
      });

      // 200 - 100 = 100
      expect(result).toBe(100);
    });
  });

  describe("real-world scenarios", () => {
    it("should handle Autocomplete-like parameters", () => {
      const result = calculateMaxHeight(250, {
        maxHeight: 300,
      });

      // 250 - 16 = 234
      expect(result).toBe(234);
    });

    it("should handle Chips-like parameters", () => {
      const result = calculateMaxHeight(400, {
        maxHeight: 320,
      });

      // Available height (400) > max height (320), so return max height
      expect(result).toBe(320);
    });

    it("should handle Menu-like parameters with viewport-based max height", () => {
      const viewportHeight = 1000;
      const maxHeightVh = (viewportHeight * 72) / 100; // 720px

      const result = calculateMaxHeight(800, {
        maxHeight: maxHeightVh,
      });

      // Available height (800) > max height (720), so return max height
      expect(result).toBe(720);
    });

    it("should handle constrained Menu scenario", () => {
      // Menu in a small viewport
      const viewportHeight = 600;
      const maxHeightVh = (viewportHeight * 72) / 100; // 432px

      const result = calculateMaxHeight(300, {
        maxHeight: maxHeightVh,
      });

      // 300 - 16 = 284
      expect(result).toBe(284);
    });

    it("should handle very constrained space", () => {
      const result = calculateMaxHeight(100, {
        maxHeight: 300,
      });

      // 100 - 16 = 84
      expect(result).toBe(84);
    });
  });
});
