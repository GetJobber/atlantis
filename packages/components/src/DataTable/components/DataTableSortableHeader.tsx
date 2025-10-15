import React from "react";
import styles from "./DataTableStyles.module.css";
import { DataTableHeaderCell } from "./DataTableHeaderCell";
import type { SortDirection } from "../SortIcon";
import { SortIcon } from "../SortIcon";

export interface DataTableSortableHeaderProps {
  /**
   * The header content to display (text, icons, etc.)
   */
  readonly children: React.ReactNode;

  /**
   * The current sort direction for this column. When undefined, the header renders as non-interactive.
   */
  readonly direction?: SortDirection;

  /**
   * Callback function triggered when the sortable header is clicked.
   * When undefined, the header renders as non-interactive.
   */
  readonly onSort?: () => void;
}

export function DataTableSortableHeader(
  props: DataTableSortableHeaderProps &
    React.HTMLAttributes<HTMLTableCellElement>,
): JSX.Element {
  const { children, direction, onSort, ...rest } = props;
  const isSortable = direction !== undefined && onSort !== undefined;

  if (!isSortable) {
    return <DataTableHeaderCell {...props}>{children}</DataTableHeaderCell>;
  }

  return (
    <DataTableHeaderCell {...rest}>
      <button type="button" onClick={onSort} className={styles.sortableButton}>
        <span className={styles.focusArea}>
          {children}
          <SortIcon direction={direction} />
        </span>
      </button>
    </DataTableHeaderCell>
  );
}
