import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

interface DataTableTableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Controls the table layout.
   * - `auto` (default): Columns size to content.
   * - `fixed`: Column widths can be set explicitly; columns without widths share remaining space.
   */
  readonly layout?: "auto" | "fixed";
}

export function DataTableTable(props: PropsWithChildren<DataTableTableProps>) {
  const { layout = "auto", className, style, ...rest } = props;

  return (
    <table
      {...rest}
      className={classNames(styles.tableElement, className)}
      style={{ ...style, tableLayout: layout }}
    >
      {props.children}
    </table>
  );
}
