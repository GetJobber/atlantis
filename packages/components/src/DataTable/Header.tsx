import type { Row, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import { SortDirection, SortIcon } from "./SortIcon";
import styles from "./DataTable.module.css";
import type { SortingType } from "./types";

interface HeaderProps<T> {
  readonly table: Table<T>;
  readonly stickyHeader?: boolean;
  readonly sorting?: SortingType;
  readonly onRowClick?: (row: Row<T>) => void;
}

export function Header<T extends object>({
  table,
  stickyHeader,
  sorting,
  onRowClick,
}: HeaderProps<T>) {
  const stickyClass = classNames({ [styles.stickyHeader]: stickyHeader });

  return (
    <thead className={stickyClass}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            const isSorting = sorting && header.column.getCanSort();
            const headingCellInlineStyle: React.CSSProperties = {
              width: header.getSize(),
              minWidth: header.column.columnDef.minSize,
              maxWidth: header.column.columnDef.maxSize,
            };

            if (isSorting) {
              headingCellInlineStyle.paddingRight = 0;
            }

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={
                  isSorting
                    ? classNames(styles.sortableColumn, {
                        [styles.pinFirstHeaderSortable]: !!onRowClick,
                      })
                    : ""
                }
                onClick={
                  sorting ? header.column.getToggleSortingHandler() : undefined
                }
                style={headingCellInlineStyle}
              >
                {header.isPlaceholder ? null : (
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() &&
                      sorting &&
                      !header.column.getIsSorted() && (
                        <SortIcon direction={SortDirection.equilibrium} />
                      )}
                    {
                      {
                        asc: <SortIcon direction={SortDirection.ascending} />,
                        desc: <SortIcon direction={SortDirection.descending} />,
                      }[header.column.getIsSorted() as string]
                    }
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
