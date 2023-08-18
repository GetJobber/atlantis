import React, { useState } from "react";
import styles from "./DataList.css";
import { EmptyState } from "./components/EmptyState";
import {
  DataListLayout,
  DataListLayoutProps,
} from "./components/DataListLayout";
import { DataListObject, DataListProps } from "./DataList.types";
import {
  generateDataListEmptyState,
  generateHeaderElements,
  generateListItemElements,
  getCompoundComponent,
} from "./DataList.utils";

export function DataList<T extends DataListObject>({
  data,
  headers,
  loading = false,
  filterApplied = false,
  children,
}: DataListProps<T>) {
  const layout = getCompoundComponent<DataListLayoutProps<T>>(
    children,
    DataListLayout,
  )?.props.children;

  const elementData = generateListItemElements(data);
  const headerData = generateHeaderElements(headers);

  const showEmptyState = !loading && data.length === 0;
  const [isFilterApplied, setIsFilterApplied] = useState(filterApplied);
  const EmptyStateComponent = generateDataListEmptyState({
    children,
    isFilterApplied,
    setIsFilterApplied,
  });

  return (
    <div className={styles.wrapper}>
      {/* List title and counter */}
      <div role="grid">
        <div className={styles.header} role="row">
          {/* Filters here, since it also sticks to the top */}
          {headerData && layout?.(headerData)}
        </div>
        {layout &&
          elementData.map((child, i) => (
            // TODO: Don't use index as key. Might have to force an ID on the data JOB-76773
            <div className={styles.listItem} key={i} role="row">
              {layout(child)}
            </div>
          ))}
      </div>
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;
