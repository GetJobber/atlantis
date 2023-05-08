import React, { ReactElement } from "react";
import classNames from "classnames";
import { GridCell, GridCellProps } from "./GridCell";
import styles from "./Grid.css";
import gaps from "./GridGap.css";
import alignments from "./GridAlign.css";

interface GridProps {
  /**
   * Add spacing between elements.
   */
  readonly gap?: keyof typeof gaps;

  /**
   * Adjust the alignment of columns
   */
  readonly align?: keyof typeof alignments;

  /**
   * Array of `Grid.Cell` children
   */
  readonly children: Array<ReactElement<GridCellProps>>;
}

export const GRID_TEST_ID = "ATL-Grid";

export function Grid({ align = "start", gap = "base", children }: GridProps) {
  const classnames = classNames(styles.grid, gaps[gap], alignments[align]);
  return (
    <div data-testid={GRID_TEST_ID} className={classnames}>
      {children}
    </div>
  );
}

Grid.Cell = GridCell;
