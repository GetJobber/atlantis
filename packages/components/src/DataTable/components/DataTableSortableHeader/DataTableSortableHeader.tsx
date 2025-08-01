import React from "react";
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

  return (
    <DataTableHeaderCell
      {...rest}
      onClick={onSort}
      style={{ cursor: isSortable ? "pointer" : "default" }}
      className={className}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
          minHeight: "24px", // Ensure consistent height
        }}
      >
        {children}
        {isSortable ? (
          <SortIcon direction={direction} />
        ) : (
          <div style={{ width: "24px", height: "24px" }} /> // Spacer for alignment
        )}
      </div>
    </DataTableHeaderCell>
  );
}
