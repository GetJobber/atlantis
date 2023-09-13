import React, { useRef } from "react";
import styles from "./DataList.css";
import { DataListTotalCount } from "./components/DataListTotalCount";
import { DataListLoadingState } from "./components/DataListLoadingState";
import { DataListLayout } from "./components/DataListLayout";
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
import { DataListLoadMore } from "./components/DataListLoadMore";
import { DataListContext, useDataListContext } from "./context/DataListContext";
import {
  DataListEmptyStateProps,
  DataListFiltersProps,
  DataListLayoutProps,
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
import { DATA_LIST_FILTERING_SPINNER_TEST_ID } from "./DataList.const";
import { Heading } from "../Heading";
import { Spinner } from "../Spinner";

export function DataList<T extends DataListObject>(props: DataListProps<T>) {
  const searchComponent = getCompoundComponent<DataListSearchProps>(
    props.children,
    DataListSearch,
  );
  const filterComponent = getCompoundComponent<DataListFiltersProps>(
    props.children,
    DataListFilters,
  );
  const layoutComponents = getCompoundComponents<
    DataListLayoutProps<DataListObject>
  >(props.children, DataListLayout);
  const emptyStateComponents = getCompoundComponents<DataListEmptyStateProps>(
    props.children,
    DataListEmptyState,
  );

  return (
    <DataListContext.Provider
      value={{
        searchComponent,
        filterComponent,
        layoutComponents,
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
    title,
    totalCount,
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
    loadingState = "none",
    layoutComponents,
  } = useDataListContext();

  const backToTopRef = useRef<HTMLDivElement>(null);

  const headerData = generateHeaderElements(headers);
  const mediaMatches = useLayoutMediaQueries();

  const initialLoading = loadingState === "initial";
  const showEmptyState = !initialLoading && data.length === 0;

  const shouldRenderLoadMoreTrigger = !initialLoading && !showEmptyState;

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        {title && <Heading level={3}>{title}</Heading>}
        <DataListTotalCount totalCount={totalCount} loading={initialLoading} />
      </div>

      {/* We need to know where the top of the list is but not necessarily the
      heading as per the design requirements */}
      <div ref={backToTopRef} />

      <DataListStickyHeader>
        <div className={styles.headerFilters}>
          <InternalDataListFilters />
          <InternalDataListSearch />
        </div>

        {headerData && (
          <DataListHeader
            layouts={layoutComponents}
            headerData={headerData}
            headerVisibility={headerVisibility}
            mediaMatches={mediaMatches}
          />
        )}
      </DataListStickyHeader>

      {initialLoading && (
        <DataListLoadingState
          headers={headers}
          layouts={layoutComponents}
          mediaMatches={mediaMatches}
        />
      )}

      {showEmptyState && <InternalDataListEmptyState />}

      {!initialLoading && (
        <DataListItems
          data={data}
          layouts={layoutComponents}
          mediaMatches={mediaMatches}
        />
      )}

      {loadingState === "filtering" && (
        <div
          data-testid={DATA_LIST_FILTERING_SPINNER_TEST_ID}
          className={styles.filtering}
        >
          <div className={styles.filteringSpinner}>
            <Spinner size="small" />
          </div>
        </div>
      )}

      {shouldRenderLoadMoreTrigger && (
        <DataListLoadMore onBackToTop={handleBackToTop} />
      )}
    </div>
  );

  function handleBackToTop() {
    // For testing purposes since jest doesn't know scrollIntoView.
    // This prevents consumer's tests from needing to mock scrollIntoView.
    if (!window.HTMLElement.prototype.scrollIntoView) return;

    backToTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }
}

DataList.Layout = DataListLayout;
DataList.EmptyState = DataListEmptyState;
DataList.Filters = DataListFilters;
DataList.Search = DataListSearch;
