import React from "react";
import styles from "./Tiles.module.css";

export const Tiles = ({
  children,
  minSize,
  space,
}: {
  readonly children: React.ReactNode;
  readonly minSize: string;
  readonly space: string;
}) => {
  return (
    <div
      style={
        {
          "--public-tile-min-size": minSize,
          "--public-tile-gap": space,
        } as React.CSSProperties
      }
      className={styles.tiles}
    >
      {children}
    </div>
  );
};
