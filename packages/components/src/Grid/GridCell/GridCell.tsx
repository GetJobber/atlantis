import React, { CSSProperties, PropsWithChildren } from "react";
import styles from "./GridCell.css";

export interface GridCellProps {
  readonly size: Record<string, number>;
}

export function GridCell({ size, children }: PropsWithChildren<GridCellProps>) {
  const cssVariables = {
    "--gridCell--size-xs": size.xs,
    "--gridCell--size-sm": size.sm,
    "--gridCell--size-md": size.md,
    "--gridCell--size-lg": size.lg,
    "--gridCell--size-xl": size.xl,
  } as CSSProperties;

  return (
    <div className={styles.gridCell} style={cssVariables}>
      {children}
    </div>
  );
}
