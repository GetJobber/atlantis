import React, { ReactElement } from "react";
import classNames from "classnames";
import { GridCell, GridCellProps } from "./GridCell";
import styles from "./Grid.css";
import gaps from "./GridGap.css";

interface GridProps {
  readonly gap?: keyof typeof gaps;
  readonly children: Array<ReactElement<GridCellProps>>;
}

export function Grid({ gap = "base", children }: GridProps) {
  const classnames = classNames(styles.grid, gaps[gap]);
  return <div className={classnames}>{children}</div>;
}

Grid.Cell = GridCell;
