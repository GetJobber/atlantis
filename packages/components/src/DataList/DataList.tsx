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
  getCompoundComponents,
  renderDataListLayout,
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

  const allLayouts = getCompoundComponents<DataListLayoutProps<T>>(
    children,
    DataListLayout,
  );

  const elementData = generateListItemElements(data);
  const headerData = generateHeaderElements(headers);

  const toRender = renderDataListLayout(allLayouts, elementData);
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
      <div className={styles.header}>
        {/* Filters here, since it also sticks to the top */}
        {headerData && layout?.(headerData)}
      </div>
      {toRender?.flatMap(_layout => _layout).map(_layout => _layout)}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;
