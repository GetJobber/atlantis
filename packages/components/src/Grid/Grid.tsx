import React, { ReactElement } from "react";
import classNames from "classnames";
import { GridCell, GridCellProps } from "./GridCell";
import styles from "./Grid.css";
import alignments from "./GridAlign.css";

interface GridProps {
  /**
   * Add spacing between elements.
   */
  readonly gap?: boolean;

  /**
   * Adjust the alignment of columns
   */
  readonly alignItems?: keyof typeof alignments;

  /**
   * Array of `Grid.Cell` children
   */
  readonly children: Array<ReactElement<GridCellProps>>;
}

export const GRID_TEST_ID = "ATL-Grid";

export function Grid({
  alignItems = "start",
  gap = true,
  children,
}: GridProps) {
  const classnames = classNames(styles.grid, alignments[alignItems], {
    [styles.gap]: gap,
  });

  return (
    <div data-testid={GRID_TEST_ID} className={classnames}>
      {children}
    </div>
  );
}

Grid.Cell = GridCell;
