// Only need the component to pass in the data as a react children

import { useAssert } from "@jobber/hooks/useAssert";
import React, { PropsWithChildren } from "react";
import { GridCellProps } from "./InternalGridCell";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GridCell(props: PropsWithChildren<GridCellProps>) {
  // Throw error when <Chip /> gets used outside of the <Chips />
  useAssert(
    true,
    "`<Grid.Cell>` can only be used inside of a `<Grid>` component!",
  );

  return <></>;
}
