import React from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export interface DataTableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  readonly children: React.ReactNode;
  /**
   * Number of columns to span across. This should match the number of columns in your table.
   */
  readonly colSpan: number;
}

export function DataTableFooter({
  children,
  className,
  colSpan,
  ...props
}: DataTableFooterProps) {
  return (
    <tfoot className={classNames(styles.footer, className)} {...props}>
      <tr>
        <td colSpan={colSpan}>{children}</td>
      </tr>
    </tfoot>
  );
}
