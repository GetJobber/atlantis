import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableHeader.module.css";

export function DataTableHeader(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <thead className={classNames(styles.headers, props.className)}>
      <tr>{props.children}</tr>
    </thead>
  );
}
