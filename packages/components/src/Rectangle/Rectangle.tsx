import React, { useMemo } from "react";
import classNames from "classnames";
import { semantic } from "@jobber/design";
import styles from "./Rectangle.module.css";
import { RectangleProps, SemanticColors, Spaces } from "./types";

const spaceTokens: Record<Spaces, string> = {
  minuscule: "var(--space-minuscule)",
  smallest: "var(--space-smallest)",
  smaller: "var(--space-smaller)",
  small: "var(--space-small)",
  base: "var(--space-base)",
  large: "var(--space-large)",
  larger: "var(--space-larger)",
  largest: "var(--space-largest)",
  extravagant: "var(--space-extravagant)",
};

export function Rectangle({
  children,
  padding = "base",
  borderWidth = "0px",
  colorSurface = "color-surface",
  colorInverse = "color-text",
  invert,
  textColor = true,
}: RectangleProps) {
  const paddingMapped = useMemo(() => {
    const paddingAsObject = (paddingIn: { x?: string; y?: string }) => {
      const x = spaceTokens[paddingIn.x as Spaces] ?? (paddingIn.x || "0");
      const y = spaceTokens[paddingIn.y as Spaces] ?? (paddingIn.y || "0");

      return {
        "--rectangle-padding-x": x,
        "--rectangle-padding-y": y,
      } as React.CSSProperties;
    };

    const paddingAsString = (paddingIn: string) => {
      const paddingValue = spaceTokens[paddingIn as Spaces] ?? paddingIn;

      return {
        "--rectangle-padding-x": paddingValue,
        "--rectangle-padding-y": paddingValue,
      } as React.CSSProperties;
    };

    return typeof padding === "object"
      ? paddingAsObject(padding)
      : paddingAsString(padding);
  }, [padding]);

  const borderWidthMapped = useMemo(
    () =>
      spaceTokens[borderWidth as Spaces]
        ? spaceTokens[borderWidth as Spaces]
        : borderWidth,
    [borderWidth],
  );

  const colorSurfaceMapped = useMemo(
    () =>
      semantic[colorSurface as SemanticColors]
        ? semantic[colorSurface as SemanticColors]
        : colorSurface,
    [colorSurface],
  );

  const colorInverseMapped = useMemo(
    () =>
      semantic[colorInverse as SemanticColors]
        ? semantic[colorInverse as SemanticColors]
        : colorInverse,
    [colorInverse],
  );

  return (
    <div
      style={
        {
          "--rectangle-border-width": borderWidthMapped,
          "--rectangle-color-surface": colorSurfaceMapped,
          "--rectangle-color-inverse": colorInverseMapped,
          ...paddingMapped,
        } as React.CSSProperties
      }
      className={classNames(styles.rectangle, {
        [styles.invert]: invert,
        [styles.color]: textColor,
      })}
    >
      {children}
    </div>
  );
}
