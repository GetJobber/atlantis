import { Table } from "@tanstack/react-table";
import React from "react";
import styles from "./Footer.css";

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
      <div className="page-info">
        <span className="flex items-center gap-1">
          {`Showing ${firstPosition}-${secondPosition} of ${totalRows} items`}
        </span>
      </div>

      <div className={styles.pageNatigation}>
        {/* 
          this can be changed to Atlantis Select component
        */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(numOfPages => (
            <option key={numOfPages} value={numOfPages}>
              {numOfPages}
            </option>
          ))}
        </select>

        <span>Per page</span>

        <div className={styles.pageNatigationButtonsContainer}>
          {/* 
            buttons can be replaced with this atlantis component:
            <Button
              type="tertiary"
              variation="subtle"
              icon="arrowLeft"
            />
          */}
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
