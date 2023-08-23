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
import { DataListTotalCount } from "./components/DataListTotalCount";
import { DataListLoadingState } from "./components/DataListLoadingState/DataListLoadingState";
import { Heading } from "../Heading";

export function DataList<T extends DataListObject>({
  data,
  headers,
  loading = false,
  filterApplied = false,
  children,
  title,
  totalCount,
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
      <div className={styles.titleContainer}>
        {title && <Heading level={3}>{title}</Heading>}
        <DataListTotalCount totalCount={totalCount} loading={loading} />
      </div>
      <div className={styles.header}>
        {/* Filters here, since it also sticks to the top */}
        {headerData && layout?.(headerData)}
      </div>
      <DataListLoadingState
        loading={loading}
        headers={headers}
        layout={layout}
      />
      {layout &&
        !loading &&
        elementData.map((child, i) => (
          <div className={styles.listItem} key={data[i].id}>
            {layout(child)}
          </div>
        ))}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;
