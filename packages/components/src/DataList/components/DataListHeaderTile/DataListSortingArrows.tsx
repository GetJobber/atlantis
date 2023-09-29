import React from "react";
import styles from "./DataListSortingArrows.css";

interface DataListSortingArrowsProps {
  readonly order?: "asc" | "desc";
}

export const SORTING_ICON_TEST_ID = "ATL-DataList-Sorting-Icon";
export function DataListSortingArrows({ order }: DataListSortingArrowsProps) {
  return (
    <div className={styles.sortIcon} data-testid={SORTING_ICON_TEST_ID}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={getActiveClassName("asc")}
          d="M16.2929 10.6661C15.9024 11.0566 15.2692 11.0566 14.8787 10.6661L12.2891 8.14263L9.70711 10.6661C9.31658 11.0566 8.68342 11.0566 8.29289 10.6661C7.90237 10.2756 7.90237 9.64239 8.29289 9.25186L11.5858 5.95897C11.9763 5.56845 12.6095 5.56845 13 5.95897L16.2929 9.25186C16.6834 9.64239 16.6834 10.2756 16.2929 10.6661Z"
        />
        <path
          className={getActiveClassName("desc")}
          d="M8.29292 13.3339C8.68345 12.9434 9.31661 12.9434 9.70714 13.3339L12.2968 15.8573L14.8787 13.3339C15.2692 12.9434 15.9024 12.9434 16.2929 13.3339C16.6834 13.7244 16.6834 14.3576 16.2929 14.7481L13 18.041C12.6095 18.4315 11.9763 18.4315 11.5858 18.041L8.29292 14.7481C7.9024 14.3576 7.9024 13.7244 8.29292 13.3339Z"
        />
      </svg>
    </div>
  );

  function getActiveClassName(
    targetOrder: DataListSortingArrowsProps["order"],
  ) {
    return order === targetOrder ? styles.active : styles.inactive;
  }
}
