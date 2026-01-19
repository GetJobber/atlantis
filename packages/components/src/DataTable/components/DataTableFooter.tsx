import React from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export interface DataTableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  readonly children: React.ReactNode;
  /**
   * Number of columns to span across. When provided, children are wrapped in a
   * single cell that spans all columns. When omitted, children are rendered
   * directly, allowing custom row/cell structures.
   */
  readonly colSpan?: number;
}

export function DataTableFooter({
  children,
  className,
  colSpan,
  ...props
}: DataTableFooterProps) {
  return (
    <tfoot {...props} className={classNames(styles.footer, className)}>
      {colSpan !== undefined ? (
        <tr>
          <td colSpan={colSpan}>{children}</td>
        </tr>
      ) : (
        children
      )}
    </tfoot>
  );
}
