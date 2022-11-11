import {
  ColumnDef,
  Row,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import React, { LegacyRef } from "react";
import { Breakpoints, useResizeObserver } from "@jobber/hooks";
import { Body } from "./Body";
import { createTableSettings } from "./createTableSettings";
import styles from "./DataTable.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Pagination, Sorting } from "./types";

export interface DataTableProps<T> {
  /**
   * The actual data that will be used for the table.
   * Typescript should infer T from typeof data.
   *
   */
  data: T[];

  /**
   * Should follow the @tanstack/react-table [ColumnDef](https://tanstack.com/table/v8/docs/guide/column-defs).
   * [createColumnHelper](https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers) is also exposed to make it more convenient
   * to create columns.
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
  const [ref, { width }] = useResizeObserver();
  const tableSettings = createTableSettings(data, columns, {
    pagination,
    sorting,
  });

  const tableClasses = classNames(styles.table, {
    [styles.pinFirstColumn]: pinFirstColumn,
  });

  const table = useReactTable(tableSettings);
  return (
    <div className={styles.dataTableContainer}>
      <div
        className={styles.tableContainer}
        style={{ height }}
        ref={ref as LegacyRef<HTMLDivElement> | undefined}
      >
        <table className={tableClasses}>
          <Header
            table={table}
            sorting={sorting}
            onRowClick={onRowClick}
            stickyHeader={stickyHeader}
          />
          <Body table={table} onRowClick={onRowClick} />

          {/* ToDo: Turn into a subcomponent after validation */}

          {width && width <= Breakpoints.small ? (
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <>
                  {footerGroup.headers
                    .filter(header => header.column.columnDef.footer)
                    .map((header, index) => (
                      <>
                        {index === 0 ? (
                          <tr key={footerGroup.id}>
                            <th key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.footer,
                                    header.getContext(),
                                  )}
                            </th>
                          </tr>
                        ) : (
                          <tr key={footerGroup.id}>
                            <th key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </th>
                            <td key={header.id}>
                              {flexRender(
                                header.column.columnDef.footer,
                                header.getContext(),
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                </>
              ))}
            </tfoot>
          ) : (
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}

          {/* ToDo end */}
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
