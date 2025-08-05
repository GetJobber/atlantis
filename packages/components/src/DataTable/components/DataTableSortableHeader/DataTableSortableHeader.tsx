import React from "react";
import styles from "./DataTableSortableHeader.module.css";
import { DataTableHeaderCell } from "../DataTableHeaderCell";
import { SortDirection, SortIcon } from "../../SortIcon";

export interface DataTableSortableHeaderProps {
  /**
   * The header text to display
   */
  readonly children: React.ReactNode;

  /**
   * The current sort direction
   */
  readonly direction?: SortDirection;

  /**
   * Callback when sort is triggered
   */
  readonly onSort?: () => void;

  /**
   * Additional CSS classes
   */
  readonly className?: string;
}

export function DataTableSortableHeader(
  props: DataTableSortableHeaderProps,
): JSX.Element {
  const { children, direction, onSort, className, ...rest } = props;
  const isSortable = direction !== undefined && onSort !== undefined;

  if (!isSortable) {
    return (
      <DataTableHeaderCell className={className} {...rest}>
        {children}
      </DataTableHeaderCell>
    );
  }

  return (
    <DataTableHeaderCell className={className} {...rest}>
      <button
        type="button"
        onClick={onSort}
        className={styles.sortableButton}
        onFocus={e => {
          const span = e.target.querySelector("span");

          if (span) {
            span.style.boxShadow = "var(--shadow-focus)";
          }
        }}
        onBlur={e => {
          const span = e.target.querySelector("span");

          if (span) {
            span.style.boxShadow = "none";
          }
        }}
      >
        <span className={styles.focusArea}>
          {children}
          <SortIcon direction={direction} />
        </span>
      </button>
    </DataTableHeaderCell>
  );
}
