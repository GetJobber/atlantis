import React, { PropsWithChildren } from "react";
import styles from "./GridCell.css";

/**
 * Breakpoints that we support
 */
const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;

/**
 *  Grab the type from breakpoints const
 */
type ValuesOf<T extends readonly unknown[]> = T[number];
type Breakpoints = ValuesOf<typeof breakpoints>;

type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridCellProps {
  /**
   * Set how much column width a cell takes the grid
   */
  readonly size: { [Breakpoint in Breakpoints]: Sizes };
}

export const GRID_CELL_TEST_ID = "ATL-Grid-GridCell";

export function GridCell({ size, children }: PropsWithChildren<GridCellProps>) {
  const cssVariables = breakpoints.reduce((values, currentSize) => {
    return Object.assign(values, {
      [`--gridCell--size-${currentSize}`]: size[currentSize],
    });
  }, {});

  return (
    <div
      data-testid={GRID_CELL_TEST_ID}
      className={styles.gridCell}
      style={cssVariables}
    >
      {children}
    </div>
  );
}
