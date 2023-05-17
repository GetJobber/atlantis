import React, { PropsWithChildren } from "react";
import styles from "./InternalGridCell.css";

/**
 * Breakpoints that we support
 */
const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;

/**
 *  Grab the type from breakpoints const
 */
type ValuesOf<T extends readonly unknown[]> = T[number];
type Breakpoints = ValuesOf<typeof breakpoints>;

type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridCellProps {
  /**
   * Set how many columns wide the cell is in the grid
   */
  readonly size: { [Breakpoint in Breakpoints]?: ColumnSizes };
}

const MAX_COLUMNS = 12;
export const GRID_CELL_TEST_ID = "ATL-Grid-GridCell";

export function InternalGridCell({
  size,
  children,
}: PropsWithChildren<GridCellProps>) {
  /**
   * Build CSS variables for column sizes for all possible breakpoints to size
   * the column
   */
  const cssSizeVariables = breakpoints.reduce(getSizeCSSVariables(size), {});

  return (
    <div
      data-testid={GRID_CELL_TEST_ID}
      className={styles.gridCell}
      style={cssSizeVariables}
    >
      {children}
    </div>
  );
}

function getSizeCSSVariables(size: GridCellProps["size"]) {
  return (
    breakpointsObj: Record<string, ColumnSizes>,
    currentSize: Breakpoints,
  ) => {
    let columnSize = size[currentSize];

    // If a column size isn't provided in the size prop, use the previous
    // breakpoint's value
    if (!columnSize) {
      const existingValues = Object.values(breakpointsObj);
      const lastKnownValue = existingValues[existingValues.length - 1];
      columnSize = lastKnownValue || MAX_COLUMNS;
    }

    breakpointsObj[`--gridCell--size-${currentSize}`] = columnSize;
    return breakpointsObj;
  };
}
