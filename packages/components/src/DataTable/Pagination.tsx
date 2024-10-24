import { Table } from "@tanstack/react-table";
import React, { useMemo } from "react";
import styles from "./Pagination.module.css";
import { Option, Select } from "../Select";
import { Button } from "../Button";
import { Text } from "../Text";
import { Glimmer } from "../Glimmer";

interface PaginationProps<T> {
  readonly table: Table<T>;
  readonly itemsPerPage?: number[];
  readonly totalItems: number;
  readonly loading: boolean;
  readonly onPageChange: () => void;
}

const defaultItemsPerPageOptions = ["10", "20", "30", "40", "50"];

export function Pagination<T extends object>({
  table,
  itemsPerPage,
  totalItems,
  loading,
  onPageChange,
}: PaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = totalItems;
  const firstPosition = pageIndex * pageSize + 1;
  const secondPosition = Math.min(totalRows, pageSize * (pageIndex + 1));

  const itemsPerPageOptions = useMemo(
    () => itemsPerPage?.map(item => String(item)) ?? defaultItemsPerPageOptions,
    [itemsPerPage],
  );

  return secondPosition <= 0 ? (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        {!loading ? <Text>No items</Text> : <Glimmer width={200} />}
      </div>
    </div>
  ) : (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        {`Showing ${firstPosition}-${secondPosition} of ${totalRows} items`}
      </div>
      <div className={styles.paginationNav}>
        <div className={styles.paginationSelect}>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={value => {
              table.setPageSize(Number(value));
            }}
            size="small"
          >
            {itemsPerPageOptions.map(numOfPages => (
              <Option key={numOfPages} value={numOfPages}>
                {numOfPages}
              </Option>
            ))}
          </Select>
          <span className={styles.paginationSelectLabel}>per page</span>
        </div>
        <div className={styles.paginationButtons}>
          <Button
            type="secondary"
            variation="subtle"
            icon="arrowLeft"
            ariaLabel="arrowLeft"
            onClick={() => {
              table.previousPage();
              onPageChange();
            }}
            disabled={!table.getCanPreviousPage()}
          />
          <Button
            type="secondary"
            variation="subtle"
            icon="arrowRight"
            ariaLabel="arrowRight"
            onClick={() => {
              table.nextPage();
              onPageChange();
            }}
            disabled={!table.getCanNextPage()}
          />
        </div>
      </div>
    </div>
  );
}
