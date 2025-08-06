import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableHeader.module.css";

export function DataTableHeader(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>,
) {
  return (
    <thead className={classNames(styles.header, props.className)} {...props}>
      <tr>{props.children}</tr>
    </thead>
  );
}
