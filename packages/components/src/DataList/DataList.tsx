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
  getCompoundComponents,
  renderDataListHeader,
  renderDataListItems,
} from "./DataList.utils";
import { DataListTotalCount } from "./components/DataListTotalCount";
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
  const allLayouts = getCompoundComponents<DataListLayoutProps<T>>(
    children,
    DataListLayout,
  );

  const elementData = generateListItemElements(data);
  const headerData = generateHeaderElements(headers);
  const dataListHeaderContent = renderDataListHeader(allLayouts, headerData);
  const dataListContent = renderDataListItems(allLayouts, elementData);
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
      {headerData && dataListHeaderContent?.map(_layout => _layout)}
      {dataListContent?.map(_layout => _layout)}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;
