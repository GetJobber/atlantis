import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./Center.module.css";
import { CenterProps, Spaces } from "./types";

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

export function Center({
  children,
  max = "50ch",
  andText,
  gutters,
  intrinsic,
}: CenterProps) {
  const guttersMapped = useMemo(
    () =>
      spaceTokens[gutters as Spaces] ? spaceTokens[gutters as Spaces] : gutters,
    [gutters],
  );

  return (
    <div
      style={
        {
          "--center-measure": max,
          "--center-gutters": guttersMapped,
        } as React.CSSProperties
      }
      className={classNames(
        styles.center,
        andText && styles.andText,
        gutters && styles.gutters,
        intrinsic && styles.intrinsic,
      )}
    >
      {children}
    </div>
  );
}
