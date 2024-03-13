// Only need the component to pass in the data as a react children

import React, { PropsWithChildren } from "react";
import { GridCellProps } from "./InternalGridCell";
import { useAssert } from "../hooks/useAssert";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GridCell(props: PropsWithChildren<GridCellProps>) {
  // Throw error when <Grid.Cell /> gets used outside of the <Grid />
  useAssert(
    true,
    "`<Grid.Cell>` can only be used inside of a `<Grid>` component!",
  );

  return <></>;
}
