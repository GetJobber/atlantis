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
import { DataListContext } from "./context/DataListContext";
import {
  DataListFilters,
  InternalDataListFilters,
} from "./components/DataListFilters";
import {
  DataListSearch,
  InternalDataListSearch,
} from "./components/DataListSearch";
import { Heading } from "../Heading";

export function DataList<T extends DataListObject>(props: DataListProps<T>) {
  return (
    <DataListContext.Provider value={props}>
      <InternalDataList {...props} />
    </DataListContext.Provider>
  );
}

function InternalDataList<T extends DataListObject>({
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
      <div className={styles.titleContainer}>
        {title && <Heading level={3}>{title}</Heading>}
        <DataListTotalCount totalCount={totalCount} loading={loading} />
      </div>

      <div className={styles.header}>
        <div className={styles.filtersContainer}>
          <InternalDataListFilters />

          <InternalDataListSearch />
        </div>

        {headerData && (
          <DataListHeader
            layouts={allLayouts}
            headerData={headerData}
            headerVisibility={headerVisibility}
            mediaMatches={mediaMatches}
          />
        )}
      </div>

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
DataList.Filters = DataListFilters;
DataList.Search = DataListSearch;
