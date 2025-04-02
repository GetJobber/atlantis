import React, { useMemo } from "react";
import classNames from "classnames";
import { semantic } from "@jobber/design";
import styles from "./Rectangle.module.css";

type Spaces =
  | "minuscule"
  | "smallest"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "largest"
  | "extravagant";

type SemanticColors = keyof typeof semantic;

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

export const Rectangle = ({
  children,
  padding = "base",
  borderWidth = "0px",
  colorSurface = "color-surface",
  colorInverse = "color-text",
  invert,
}: {
  readonly children: React.ReactNode;
  readonly padding?: Spaces | (string & NonNullable<unknown>);
  readonly borderWidth?: Spaces | (string & NonNullable<unknown>);
  readonly colorSurface?: SemanticColors | (string & NonNullable<unknown>);
  readonly colorInverse?: SemanticColors | (string & NonNullable<unknown>);
  readonly invert?: boolean;
}) => {
  const paddingMapped = useMemo(
    () =>
      spaceTokens[padding as Spaces] ? spaceTokens[padding as Spaces] : padding,
    [padding],
  );

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
          "--rectangle-padding": paddingMapped,
          "--rectangle-border-width": borderWidthMapped,
          "--rectangle-color-surface": colorSurfaceMapped,
          "--rectangle-color-inverse": colorInverseMapped,
        } as React.CSSProperties
      }
      className={classNames(styles.rectangle, {
        [styles.invert]: invert,
      })}
    >
      {children}
    </div>
  );
};
