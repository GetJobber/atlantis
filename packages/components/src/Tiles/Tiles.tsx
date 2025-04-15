import React from "react";
import styles from "./Tiles.module.css";
import { TilesProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

export function Tiles({
  children,
  minSize = "30ch",
  gap = "base",
  autoWidth = false,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
}: TilesProps) {
  const spaceMapped = useSpaces(gap);

  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
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
    </Tag>
  );
}
