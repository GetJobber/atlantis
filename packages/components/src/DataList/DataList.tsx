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
  getCompoundComponents,
} from "./DataList.utils";
import { DataListTotalCount } from "./components/DataListTotalCount";
import { DataListLoadingState } from "./components/DataListLoadingState/DataListLoadingState";
import {
  DataListHeader,
  DataListItems,
} from "./components/DataListLayoutInternal";
import { useLayoutMediaQueries } from "./hooks/useLayoutMediaQueries";
import { Heading } from "../Heading";

export function DataList<T extends DataListObject>({
  data,
  headers,
  loading = false,
  filterApplied = false,
  children,
  title,
  totalCount,
  headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
}: DataListProps<T>) {
  const allLayouts = getCompoundComponents<DataListLayoutProps<T>>(
    children,
    DataListLayout,
  );

  const headerData = generateHeaderElements(headers);
  const mediaMatches = useLayoutMediaQueries();

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
      {headerData && (
        <DataListHeader
          layouts={allLayouts}
          headerData={headerData}
          headerVisibility={headerVisibility}
          mediaMatches={mediaMatches}
        />
      )}
      <DataListLoadingState
        loading={loading}
        headers={headers}
        layouts={allLayouts}
        mediaMatches={mediaMatches}
      />
      {!loading && (
        <DataListItems
          data={data}
          layouts={allLayouts}
          mediaMatches={mediaMatches}
        />
      )}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;
