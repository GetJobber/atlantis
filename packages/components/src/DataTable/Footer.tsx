import { Table } from "@tanstack/react-table";
import React from "react";
import styles from "./Footer.css";
import { Option, Select } from "../Select";
import { Button } from "../Button";
import { Text } from "../Text";

interface FooterProps<T> {
  table: Table<T>;
}

export function Footer<T extends object>({ table }: FooterProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getCoreRowModel().rows.length;
  const firstPosition = pageIndex * pageSize + 1;
  const secondPosition = Math.min(totalRows, pageSize * (pageIndex + 1));

  return (
    <div className={styles.footerContainer}>
      <Text>
        {`Showing ${firstPosition}-${secondPosition} of ${totalRows} items`}
      </Text>

      <div className={styles.pageNavigation}>
        <div className={styles.pageNavigationSelect}>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={value => {
              table.setPageSize(Number(value));
            }}
          >
            {["10", "20", "30", "40", "50"].map(numOfPages => (
              <Option key={numOfPages} value={numOfPages}>
                {numOfPages}
              </Option>
            ))}
          </Select>
        </div>

        <span>Per page</span>

        <div className={styles.pageNavigationButtonsContainer}>
          <Button
            type="secondary"
            variation="subtle"
            icon="arrowLeft"
            ariaLabel="arrowLeft"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Button
            type="secondary"
            variation="subtle"
            icon="arrowRight"
            ariaLabel="arrowRight"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </div>
      </div>
    </div>
  );
}
