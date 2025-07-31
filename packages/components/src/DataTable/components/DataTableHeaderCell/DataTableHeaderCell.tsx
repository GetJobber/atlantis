import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableHeaderCell.module.css";

export function DataTableHeaderCell(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <th className={classNames(styles.headerCell, props.className)}>
      {props.children}
    </th>
  );
}
