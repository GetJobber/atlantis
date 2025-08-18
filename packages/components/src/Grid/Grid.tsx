import type { ReactNode } from "react";
import React from "react";
import classNames from "classnames";
import styles from "./Grid.module.css";
import alignments from "./GridAlign.module.css";
import { GridCell } from "./GridCell";

interface GridProps {
  /**
   * Add spacing between elements.
   */
  readonly gap?: boolean;

  /**
   * Adjust the alignment of columns. We only support a few select properties
   * from `align-items` due to the nature of the other properties acting the
   * same. Read more about [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) property values.
   */
  readonly alignItems?: keyof typeof alignments;

  /**
   * `Grid.Cell` children
   */
  readonly children: ReactNode;
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
