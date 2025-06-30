import { allColors } from "@jobber/design";
import {
  colorsAreEqual,
  hexToHsl,
  hexToRgb,
  hslToHex,
  normalizeColor,
  rgbToHex,
} from "./colorTokenMatch";

describe("Color Token Match", () => {
  describe("Hex to HSL", () => {
    it("converts hex to HSL", () => {
      expect(hexToHsl("#ff0000")).toEqual({ h: 0, s: 100, l: 50 });
      expect(hexToHsl("#00ff00")).toEqual({ h: 120, s: 100, l: 50 });
      expect(hexToHsl("#0000ff")).toEqual({ h: 240, s: 100, l: 50 });
    });
  });

  describe("Hex to RGB", () => {
    it("converts hex to RGB", () => {
      expect(hexToRgb("#ff0000")).toEqual({ r: 1, g: 0, b: 0 });
      expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 1, b: 0 });
      expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 1 });
    });
  });

  describe("HSL to hex", () => {
    it("converts HSL to hex", () => {
      expect(hslToHex(0, 100, 50)).toBe("#ff0000");
      expect(hslToHex(120, 100, 50)).toBe("#00ff00");
      expect(hslToHex(240, 100, 50)).toBe("#0000ff");
    });
  });

  describe("RGB to hex", () => {
    it("converts RGB to hex", () => {
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
    });
  });

  describe("normalize color", () => {
    it("normalizes 3-digit hex to 6-digit hex", () => {
      expect(normalizeColor("#fff")).toBe("#ffffff");
    });

    it("normalizes 6-digit hex to lowercase", () => {
      expect(normalizeColor("#ABCDEF")).toBe("#abcdef");
    });

    it("normalizes HSL to hex", () => {
      expect(normalizeColor("hsl(0, 100%, 50%)")).toBe("#ff0000");
    });

    it("normalizes RGB to hex", () => {
      expect(normalizeColor("rgb(255, 0, 0)")).toBe("#ff0000");
    });

    it("normalizes RGBA to hex", () => {
      expect(normalizeColor("rgba(0, 0, 255, 0.7)")).toBe("#0000ff");
    });
  });

  describe("colors are equal", () => {
    it("returns true for equivalent colors in different formats", () => {
      expect(colorsAreEqual("#ff0000", "hsl(0, 100%, 50%)")).toBe(true);
      expect(colorsAreEqual("#ff0000", "rgb(255, 0, 0)")).toBe(true);
      expect(colorsAreEqual("#ff0000", "rgba(255, 0, 0, 1)")).toBe(true);
    });

    it("returns false for different colors", () => {
      expect(colorsAreEqual("#ff0000", "#00ff00")).toBe(false);
    });
  });

  describe("token name match", () => {
    const cases = [
      {
        input: "#032B3A",
        expectedTokens: ["color-base-blue--900", "color-heading"],
      },
      {
        input: "hsl(86, 100%, 46%)",
        expectedTokens: ["color-brand--highlight"],
      },
      {
        input: "rgba(255, 255, 255, 1)",
        expectedTokens: ["color-white", "color-text--reverse"],
      },
      {
        input: "rgb(85, 106, 203)",
        expectedTokens: ["color-indigo"],
      },
    ];

    cases.forEach(({ input, expectedTokens }) => {
      test(`returns the correct token(s) for input "${input}" (expects: ${expectedTokens.join(
        ", ",
      )})`, () => {
        const normalizedInput = normalizeColor(input);

        const matches = Object.entries(allColors).filter(
          ([, colorValue]) =>
            typeof colorValue === "string" &&
            colorsAreEqual(normalizedInput, normalizeColor(colorValue), 2),
        );

        const matchTokens = matches.map(([token]) => token);

        expectedTokens.forEach(expected => {
          expect(matchTokens).toContain(expected);
        });
      });
    });
  });

  describe("no matches", () => {
    it("returns an empty array if no matches are found", () => {
      const input = "#123456";
      const normalizedInput = normalizeColor(input);

      const matches = Object.entries(allColors).filter(
        ([, colorValue]) =>
          typeof colorValue === "string" &&
          colorsAreEqual(normalizedInput, normalizeColor(colorValue), 2),
      );

      expect(matches).toEqual([]);
      expect(matches.length).toBe(0);
    });
  });
});
