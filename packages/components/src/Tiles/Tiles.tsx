import React from "react";
import styles from "./Tiles.module.css";
import { TilesProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";

export function Tiles({
  children,
  minSize = "30ch",
  space = "base",
}: TilesProps) {
  const spaceMapped = useSpaces(space);

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
