import React, { useMemo } from "react";
import styles from "./Tiles.module.css";
import { Spaces, TilesProps } from "./types";

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

export function Tiles({
  children,
  minSize = "30ch",
  space = "base",
}: TilesProps) {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );

  return (
    <div
      style={
        {
          "--public-tile-min-size": minSize,
          "--public-tile-space": spaceMapped,
        } as React.CSSProperties
      }
      className={styles.tiles}
    >
      {children}
    </div>
  );
}
