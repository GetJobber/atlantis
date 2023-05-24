import React, { ReactElement } from "react";
import classNames from "classnames";
import { GridCellProps, InternalGridCell } from "./InternalGridCell";
import styles from "./Grid.css";
import alignments from "./GridAlign.css";
import { GridCell } from "./GridCell";

export interface GridProps {
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
      {React.Children.map(children, ({ props }: { props: GridCellProps }) => {
        return <InternalGridCell {...props} />;
      })}
    </div>
  );
}

Grid.Cell = GridCell;
