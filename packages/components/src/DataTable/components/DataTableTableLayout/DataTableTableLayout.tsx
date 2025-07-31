import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableLayout.module.css";

export function DataTableTableLayout(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <div className={classNames(styles.tableLayout, props.className)}>
      {props.children}
    </div>
  );
}
