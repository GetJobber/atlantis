import React from "react";
import styles from "./Tiles.module.css";
import { TilesProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";

export function Tiles({
  children,
  minSize = "30ch",
  space = "base",
  autoWidth = false,
}: TilesProps) {
  const spaceMapped = useSpaces(space);

  return (
    <div
      style={
        {
          "--public-tile-min-size": minSize,
          "--public-tile-space": spaceMapped,
          "--public-tiles-width": autoWidth ? "auto" : "100%",
        } as React.CSSProperties
      }
      className={styles.tiles}
    >
      {children}
    </div>
  );
}
