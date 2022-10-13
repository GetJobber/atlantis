import React from "react";
import classnames from "classnames";
import styles from "./DataTable.css";

interface DataTableProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Text to display.
   */
  readonly text: string;

  /**
   * Click handler.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function DataTable({ loud = false, text, onClick }: DataTableProps) {
  const className = classnames(styles.dataTable, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
