import React from "react";
import classNames from "classnames";
import styles from "./DataTableFooter.module.css";

export interface DataTableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  readonly children: React.ReactNode;
}

export function DataTableFooter({
  children,
  className,
  ...props
}: DataTableFooterProps) {
  return (
    <tfoot className={classNames(styles.footer, className)} {...props}>
      <tr>
        <td colSpan={1000}>{children}</td>
      </tr>
    </tfoot>
  );
}
