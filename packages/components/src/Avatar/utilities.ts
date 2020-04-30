import Color from "color";

export function isDark(colorToCheck?: string): boolean {
  if (colorToCheck == undefined) {
    return false;
  }

  if (colorToCheck) {
    try {
      return Color(deconstructCssCustomProperty(colorToCheck)).isDark();
    } catch (err) {
      console.log(err);
    }
  }

  return false;
}

function deconstructCssCustomProperty(color: string) {
  if (!color) {
    return;
  }

  if (!color.toLowerCase().startsWith("var(")) {
    return color;
  }

  /**
   * Rips apart the `var(--custom-property)` into just `--custom-property`.
   */
  const customProperty = color
    .replace("var(", "")
    .slice(0, -1)
    .split(" ")
    .join("");

  return getComputedStyle(document.documentElement)
    .getPropertyValue(customProperty)
    .trim();
}
