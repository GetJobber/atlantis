/* eslint-disable max-statements */
import React, { useMemo, useRef, useState } from "react";
import styles from "./DataList.module.css";
import { DataListTotalCount } from "./components/DataListTotalCount";
import { DataListLoadingState } from "./components/DataListLoadingState";
import { DataListLayout } from "./components/DataListLayout";
import { DataListHeader } from "./components/DataListHeader";
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
import { DataListItemActions } from "./components/DataListItemActions";
import { DataListAction } from "./components/DataListAction";
import { DataListLayoutActions } from "./components/DataListLayoutActions";
import { DataListContext, useDataListContext } from "./context/DataListContext";
import {
  DataListBulkActionProps,
  DataListBulkActionsProps,
  DataListEmptyStateProps,
  DataListFiltersProps,
  DataListItemActionsProps,
  DataListLayoutProps,
  DataListObject,
  DataListProps,
  DataListSearchProps,
  LayoutRenderer,
} from "./DataList.types";
import {
  getCompoundComponent,
  getCompoundComponents,
  sortBreakpoints,
} from "./DataList.utils";
import {
  Breakpoints,
  DATA_LIST_FILTERING_SPINNER_TEST_ID,
} from "./DataList.const";
import { DataListBulkActions } from "./components/DataListBulkActions";
import {
  DataListStatusBar,
  InternalDataListStatusBar,
} from "./components/DataListStatusBar";
import { Heading } from "../Heading";
import { Spinner } from "../Spinner";

export function DataList<T extends DataListObject>({
  selected = [],
  sorting,
  ...props
}: DataListProps<T>) {
  const [layouts, setLayouts] = useState<{
    [Breakpoint in Breakpoints]?: LayoutRenderer<DataListObject>;
  }>({});

  const layoutBreakpoints = useMemo(
    () => sortBreakpoints(Object.keys(layouts) as Breakpoints[]),
    [layouts],
  );

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
  const itemActionComponent = getCompoundComponent<
    DataListItemActionsProps<DataListObject>
  >(props.children, DataListItemActions);
  const bulkActionsComponent = getCompoundComponent<DataListBulkActionsProps>(
    props.children,
    DataListBulkActions,
  );
  const headerCount = Object.keys(props.headers).length;

  const shouldRenderStickyHeader =
    !!filterComponent || !!searchComponent || headerCount > 0;

  return (
    <DataListContext.Provider
      value={{
        searchComponent,
        filterComponent,
        layoutComponents,
        emptyStateComponents,
        itemActionComponent,
        bulkActionsComponent,
        layoutBreakpoints,
        layouts,
        registerLayout,
        ...props,
        selected,
        // T !== DataListObject
        sorting: sorting as DataListProps<DataListObject>["sorting"],
      }}
    >
      <InternalDataList shouldRenderStickyHeader={shouldRenderStickyHeader} />
    </DataListContext.Provider>
  );

  function registerLayout(
    size: Breakpoints,
    children: LayoutRenderer<DataListObject>,
  ) {
    setLayouts(prev => ({
      ...prev,
      [size]: children,
    }));
  }
}

function InternalDataList({
  shouldRenderStickyHeader,
}: {
  readonly shouldRenderStickyHeader: boolean;
}) {
  const {
    data,
    title,
    totalCount,
    loadingState = "none",
    layoutComponents,
  } = useDataListContext();

  const backToTopRef = useRef<HTMLDivElement>(null);

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

      {shouldRenderStickyHeader && (
        <DataListStickyHeader>
          <div className={styles.headerFilters}>
            <InternalDataListFilters />
            <InternalDataListSearch />
          </div>

          <InternalDataListStatusBar />
          <DataListHeader />
        </DataListStickyHeader>
      )}

      {initialLoading && <DataListLoadingState />}

      {showEmptyState && <InternalDataListEmptyState />}

      {layoutComponents}

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

/**
 * Sets the layout that the DataList item and header will use.
 */
DataList.Layout = DataListLayout;

/**
 * By using this component, we can render the actions anywhere in the layout
 * instead of being added automatically on hover.
 */
DataList.LayoutActions = DataListLayoutActions;

/**
 * When the DataList is either empty and/or filtered, this component will be
 * rendered.
 */
DataList.EmptyState = DataListEmptyState;

/**
 * Adds the filter components of your choosing to the DataList.
 */
DataList.Filters = DataListFilters;

/**
 * Enables the search functionality of the DataList.
 *
 * Since the debounce is implemented within the component, it can only be an
 * uncontrolled component. Thus the lack of a `value` prop.
 */
DataList.Search = DataListSearch;

/**
 * Defines the group actions you could do on a single DataList item.
 */
DataList.ItemActions = DataListItemActions;

/**
 * Defines the action in a DataList. This should be used inside the
 * DataListItemActions component.
 */
DataList.ItemAction = DataListAction;

/**
 * Defines the group actions you could do on multiple DataList items.
 */
DataList.BatchActions = DataListBulkActions;

/**
 * Defines the batch action in a DataList. This should be used inside the
 * DataListBatchActions component.
 */
DataList.BatchAction = function DataListBatchAction(
  props: DataListBulkActionProps,
) {
  return <DataListAction {...props} />;
};

/**
 * Defines a status bar that is rendered between the filters and the header.
 */
DataList.StatusBar = DataListStatusBar;
