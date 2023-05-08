import React, { PropsWithChildren } from "react";
import styles from "./GridCell.css";

/**
 * Breakpoints that we support
 */
const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;

/**
 *  Grab type from breakpoints const
 */
type ValuesOf<T extends readonly unknown[]> = T[number];
type Breakpoints = ValuesOf<typeof breakpoints>;

type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridCellProps {
  readonly size: Record<Breakpoints, Sizes>;
}

export function GridCell({ size, children }: PropsWithChildren<GridCellProps>) {
  const cssVariables = breakpoints.reduce((values, currentSize) => {
    return Object.assign(values, {
      [`--gridCell--size-${currentSize}`]: size[currentSize],
    });
  }, {});

  return (
    <div className={styles.gridCell} style={cssVariables}>
      {children}
    </div>
  );
}
