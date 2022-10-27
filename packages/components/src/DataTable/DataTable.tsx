import {
  ColumnDef,
  Row,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback } from "react";
import classNames from "classnames";
import { createTableSettings } from "./createTableSettings";
import styles from "./DataTable.css";
import { Footer } from "./Footer";
import { Pagination, Sorting } from "./types";
import { Icon } from "../Icon";

interface DataTableProps<T> {
  /**
   * The actual data that will be used for the table.
   * Typescript should infer T from typeof data.
   *
   */
  data: T[];

  /**
   * Should follow the @tanstack/react-table ColumnDef..
   * https://tanstack.com/table/v8/docs/guide/column-defs
   *
   */
  columns: ColumnDef<T>[];

  /**
   * Enables pagination, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/pagination
   *
   */
  pagination?: Pagination;

  /**
   * Enables sorting, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/sorting#table-options
   *
   */
  sorting?: Sorting;

  /**
   * This will force the table to have the specified hight
   *
   */
  height?: number;
  /**
   * When set to true makes the header sticky while scrolling vertically
   *
   */
  stickyHeader?: boolean;

  /**
   * Pins the firstColumn when scrolling horizontally
   *
   */
  pinFirstColumn?: boolean;

  /**
   * Enables row click action. The provided callback will be executed when the row is clicked.
   */
  onRowClick?: (row: Row<T>) => void;
}

export function DataTable<T extends object>({
  data,
  columns,
  pagination,
  sorting,
  height,
  stickyHeader,
  pinFirstColumn,
  onRowClick,
}: DataTableProps<T>) {
  const tableSettings = createTableSettings(data, columns, {
    pagination,
    sorting,
  });

  const stickyClass = classNames({ [styles.stickyHeader]: stickyHeader });

  const tableClasses = classNames(styles.table, {
    [styles.pinFirstColumn]: pinFirstColumn,
  });

  const bodyRowClasses = classNames({ [styles.clicableRow]: !!onRowClick });

  const handleRowClick = useCallback(
    (row: Row<T>) => () => {
      if (onRowClick == undefined) return;
      onRowClick(row);
    },
    [onRowClick],
  );

  const table = useReactTable(tableSettings);
  return (
    <div className={styles.dataTableContainer}>
      <div className={styles.tableContainer} style={{ height }}>
        <table className={tableClasses}>
          <thead className={stickyClass}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={
                        sorting && header.column.getCanSort()
                          ? classNames(styles.sortableColumn, {
                              [styles.pinFirstHeaderSortable]: !!onRowClick,
                            })
                          : ""
                      }
                      onClick={
                        sorting
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <Icon name="longArrowUp" color="green" />,
                            desc: <Icon name="longArrowDown" color="green" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <svg
                              style={{
                                width: "var(--space-large)",
                                height: "var(--space-large)",
                              }}
                            />
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr
                  key={row.id}
                  onClick={handleRowClick(row)}
                  className={bodyRowClasses}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Footer
          table={table}
          itemsPerPage={pagination.itemsPerPage}
          totalItems={
            pagination.manualPagination
              ? pagination.totalItems
              : table.getCoreRowModel().rows.length
          }
        />
      )}
    </div>
  );
}
