import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableRoot.module.css";

export function DataTableTableRoot(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <div className={classNames(styles.tableRoot, props.className)}>
      {props.children}
    </div>
  );
}
