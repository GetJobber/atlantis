import type { tokens } from "@jobber/design";

type Color = {
  // Omit non-color properties from the token map
  [K in keyof typeof tokens]: K extends `color-${string}`
    ? // Omit the base colors as they shouldn't be used
      K extends `color-base-${string}`
      ? never
      : K
    : never;
}[keyof typeof tokens];

export type UnderlineStyle = "solid" | "double" | "dotted" | "dashed";

export type UnderlineStyleWithColor = `${UnderlineStyle} ${Color}`;
