/**
 * Converts HSL color to hex format
 */
export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;

  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Converts hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace("#", "");

  return {
    r: parseInt(cleanHex.slice(0, 2), 16) / 255,
    g: parseInt(cleanHex.slice(2, 4), 16) / 255,
    b: parseInt(cleanHex.slice(4, 6), 16) / 255,
  };
}

/**
 * Converts hex color to HSL format
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts RGB values to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g)
    .toString(16)
    .padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}

/**
 * Normalizes HSL color to hex
 */
function normalizeHslColor(color: string): string | null {
  const hslMatch = color.match(/hsl\(\s*(\d+),\s*(\d+)%\s*,\s*(\d+)%\s*\)/i);

  if (hslMatch) {
    const [, h, s, l] = hslMatch;

    return hslToHex(parseInt(h, 10), parseInt(s, 10), parseInt(l, 10));
  }

  return null;
}

/**
 * Normalizes RGB color to hex
 */
function normalizeRgbColor(color: string): string | null {
  const rgbMatch = color.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/i);

  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;

    return rgbToHex(parseInt(r, 10), parseInt(g, 10), parseInt(b, 10));
  }

  return null;
}

/**
 * Normalizes RGBA color to hex
 */
function normalizeRgbaColor(color: string): string | null {
  const rgbaMatch = color.match(
    /rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)/i,
  );

  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch;

    return rgbToHex(parseInt(r, 10), parseInt(g, 10), parseInt(b, 10));
  }

  return null;
}

/**
 * Normalizes hex color format
 */
function normalizeHexColor(color: string): string | null {
  if (color.startsWith("#")) {
    const hex = color.slice(1);

    if (hex.length === 3) {
      // Convert 3-digit hex to 6-digit
      return `#${hex
        .split("")
        .map(char => char + char)
        .join("")}`;
    }

    if (hex.length === 6) {
      return color.toLowerCase();
    }
  }

  return null;
}

/**
 * Normalizes a color value to a consistent format for comparison
 * Handles HSL, RGB, RGBA, and hex formats
 */
export function normalizeColor(color: string): string {
  const normalizers = [
    normalizeHslColor,
    normalizeRgbColor,
    normalizeRgbaColor,
    normalizeHexColor,
  ];

  for (const normalize of normalizers) {
    const result = normalize(color);
    if (result) return result;
  }

  return color;
}

/**
 * Checks if two colors are approximately equal (within a tolerance)
 */
export function colorsAreEqual(
  color1: string,
  color2: string,
  tolerance: number = 0,
): boolean {
  const normalized1 = normalizeColor(color1);
  const normalized2 = normalizeColor(color2);

  if (tolerance === 0) {
    return normalized1 === normalized2;
  }

  // For tolerance comparison, convert to HSL and compare
  const hsl1 = hexToHsl(normalized1);
  const hsl2 = hexToHsl(normalized2);

  return (
    Math.abs(hsl1.h - hsl2.h) <= tolerance &&
    Math.abs(hsl1.s - hsl2.s) <= tolerance &&
    Math.abs(hsl1.l - hsl2.l) <= tolerance
  );
}
