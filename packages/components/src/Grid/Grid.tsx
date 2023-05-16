import React, { PropsWithChildren, ReactElement } from "react";
import classNames from "classnames";
import { useAssert } from "@jobber/hooks/useAssert";
import { GridCellProps, InternalGridCell } from "./InternalGridCell";
import styles from "./Grid.css";
import alignments from "./GridAlign.css";

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
      {React.Children.map(children, gridCell => {
        return <InternalGridCell {...gridCell.props} />;
      })}
    </div>
  );
}

// Only need the component to pass in the data as a react children
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GridCell(props: PropsWithChildren<GridCellProps>) {
  // Throw error when <Chip /> gets used outside of the <Chips />
  useAssert(
    true,
    "`<Grid.Cell>` can only be used inside of a `<Grid>` component!",
  );

  return <></>;
}

Grid.Cell = GridCell;
