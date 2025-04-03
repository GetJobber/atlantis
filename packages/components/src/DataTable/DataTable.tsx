/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  ExpandedState,
  Row,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import React, { LegacyRef, ReactNode } from "react";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import { Body } from "./Body";
import { createTableSettings } from "./createTableSettings";
import styles from "./DataTable.module.css";
import { Pagination } from "./Pagination";
import { PaginationType, SortingType } from "./types";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface DataTableProps<T> {
  /**
   * The actual data that will be used for the table.
   * Typescript should infer T from typeof data.
   *
   */
  readonly data: T[];

  /**
   * Should follow the @tanstack/react-table [ColumnDef](https://tanstack.com/table/v8/docs/guide/column-defs).
   * [createColumnHelper](https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers) is also exposed to make it more convenient
   * to create columns.
   */
  readonly columns: ColumnDef<T>[];

  /**
   * Enables pagination, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/pagination
   *
   */
  readonly pagination?: PaginationType;

  /**
   * Enables sorting, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/sorting#table-options
   *
   */
  readonly sorting?: SortingType;

  /**
   * This will force the table to have the specified hight
   *
   */
  readonly height?: number;
  /**
   * When set to true makes the header sticky while scrolling vertically
   *
   */
  readonly stickyHeader?: boolean;

  /**
   * Pins the firstColumn when scrolling horizontally
   *
   */
  readonly pinFirstColumn?: boolean;

  /**
   * Enables row click action. The provided callback will be executed when the row is clicked.
   */
  readonly onRowClick?: (row: Row<T>) => void;

  /**
   * The elements to display when the data table is empty
   */
  readonly emptyState?: ReactNode | ReactNode[];

  /**
   * When true, shows the loading state of the DataTable
   */
  readonly loading?: boolean;

  readonly getSubRows?:
    | ((originalRow: unknown, index: number) => undefined | unknown[])
    | undefined;
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
  getSubRows,
  emptyState,
  loading = false,
}: DataTableProps<T>) {
  const [ref, { exactWidth }] = useResizeObserver<HTMLDivElement>();
  const tableSettings = createTableSettings(data, columns, {
    pagination,
    sorting,
  });

  const tableClasses = classNames(styles.table, {
    [styles.pinFirstColumn]: pinFirstColumn,
  });

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const exandableRowTableSettings = {
    getSubRows,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
  };

  const table = useReactTable({
    ...tableSettings,
    ...exandableRowTableSettings,
  } as any);

  return (
    <div className={styles.dataTableContainer}>
      <div
        data-testid="ATL-DataTable-Container"
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
          <Body
            table={table}
            onRowClick={onRowClick}
            emptyState={emptyState}
            loading={loading}
          />
          {table.getRowModel().rows.length &&
          exactWidth &&
          exactWidth > Breakpoints.small ? (
            <Footer table={table} viewType="desktop" />
          ) : null}
        </table>
      </div>
      {table.getRowModel().rows.length &&
      exactWidth &&
      exactWidth <= Breakpoints.small ? (
        <Footer table={table} />
      ) : null}

      {pagination && (
        <Pagination
          table={table}
          itemsPerPage={pagination.itemsPerPage}
          totalItems={
            pagination.manualPagination
              ? pagination.totalItems
              : table.getCoreRowModel().rows.length
          }
          loading={loading}
          onPageChange={() => ref.current?.scrollTo(0, 0)}
        />
      )}
    </div>
  );
}
