import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export function DataTableHeader(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>,
) {
  return (
    <thead {...props} className={classNames(styles.header, props.className)}>
      <tr>{props.children}</tr>
    </thead>
  );
}
