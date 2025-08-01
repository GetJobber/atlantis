import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableLayout.module.css";

export function DataTableTableLayout(
  props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div className={classNames(styles.tableLayout, props.className)} {...props}>
      {props.children}
    </div>
  );
}
