import React from "react";
import classNames from "classnames";
import styles from "./Tiles.module.css";
import { TilesProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function Tiles({
  children,
  minSize = "30ch",
  gap = "base",
  autoWidth = false,
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: TilesProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--public-tile-min-size": minSize,
          "--public-tile-space": getMappedAtlantisSpaceToken(gap),
          "--public-tiles-width": autoWidth ? "auto" : "100%",
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(styles.tiles, UNSAFE_className?.container)}
    >
      {children}
    </Tag>
  );
}
