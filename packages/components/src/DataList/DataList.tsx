import React from "react";
import styles from "./DataList.css";
import {
  DataListLayout,
  DataListLayoutProps,
} from "./components/DataListLayout";
import { DataListTotalCount } from "./components/DataListTotalCount";
import { DataListLoadingState } from "./components/DataListLoadingState";
import {
  DataListHeader,
  DataListItems,
} from "./components/DataListLayoutInternal";
import {
  DataListFilters,
  InternalDataListFilters,
} from "./components/DataListFilters";
import { DataListStickyHeader } from "./components/DataListStickyHeader";
import {
  DataListSearch,
  InternalDataListSearch,
} from "./components/DataListSearch";
import {
  DataListEmptyState,
  InternalDataListEmptyState,
} from "./components/DataListEmptyState";
import { DataListContext, useDataListContext } from "./context/DataListContext";
import {
  DataListEmptyStateProps,
  DataListFiltersProps,
  DataListObject,
  DataListProps,
  DataListSearchProps,
} from "./DataList.types";
import {
  generateHeaderElements,
  getCompoundComponent,
  getCompoundComponents,
} from "./DataList.utils";
import { useLayoutMediaQueries } from "./hooks/useLayoutMediaQueries";
import { Heading } from "../Heading";

export function DataList<T extends DataListObject>(props: DataListProps<T>) {
  const searchComponent = getCompoundComponent<DataListSearchProps>(
    props.children,
    DataListSearch,
  );
  const filterComponent = getCompoundComponent<DataListFiltersProps>(
    props.children,
    DataListFilters,
  );
  const emptyStateComponents = getCompoundComponents<DataListEmptyStateProps>(
    props.children,
    DataListEmptyState,
  );

  return (
    <DataListContext.Provider
      value={{
        searchComponent,
        filterComponent,
        emptyStateComponents,
        ...props,
      }}
    >
      <InternalDataList />
    </DataListContext.Provider>
  );
}

function InternalDataList() {
  const {
    data,
    headers,
    loading = false,
    children,
    title,
    totalCount,
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
  } = useDataListContext();

  const allLayouts = getCompoundComponents<DataListLayoutProps<DataListObject>>(
    children,
    DataListLayout,
  );

  const headerData = generateHeaderElements(headers);
  const mediaMatches = useLayoutMediaQueries();

  const showEmptyState = !loading && data.length === 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        {title && <Heading level={3}>{title}</Heading>}
        <DataListTotalCount totalCount={totalCount} loading={loading} />
      </div>

      <DataListStickyHeader>
        <div className={styles.headerFilters}>
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
      </DataListStickyHeader>

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

      {showEmptyState && <InternalDataListEmptyState />}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = DataListEmptyState;
DataList.Filters = DataListFilters;
DataList.Search = DataListSearch;
