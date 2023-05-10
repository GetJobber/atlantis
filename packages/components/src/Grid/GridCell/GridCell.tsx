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
   * Set how many columns wide the cell is in the grid
   */
  readonly size: { [Breakpoint in Breakpoints]?: Sizes };
}

const MAX_COLUMNS = 12;
export const GRID_CELL_TEST_ID = "ATL-Grid-GridCell";

export function GridCell({ size, children }: PropsWithChildren<GridCellProps>) {
  const cssVariables = breakpoints.reduce(getCSSVariables(size), {});

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

function getCSSVariables(size: GridCellProps["size"]) {
  return (breakpointsObj: Record<string, Sizes>, currentSize: Breakpoints) => {
    let columnSize = size[currentSize];

    if (!columnSize) {
      const existingValues = Object.values(breakpointsObj);
      const lastKnownValue = existingValues[existingValues.length - 1];
      columnSize = lastKnownValue || MAX_COLUMNS;
    }

    breakpointsObj[`--gridCell--size-${currentSize}`] = columnSize;
    return breakpointsObj;
  };
}
