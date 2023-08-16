import React, { isValidElement, useState } from "react";
import styles from "./DataList.css";
import { EmptyState, EmptyStateProps } from "./components/EmptyState";
import { DataListLayout, DataListLayoutProps } from "./components";
import { DataListObject, DataListProps } from "./DataList.types";
import {
  generateElementsFromData,
  generateHeaderFromData,
  getCompoundComponent,
} from "./DataList.utils";

export const EMPTY_FILTER_RESULTS_MESSAGE = "No Results for Selected Filters";
export const EMPTY_FILTER_RESULTS_ACTION_LABEL = "Clear Filters";

export function DataList<T extends DataListObject>({
  data,
  loading = false,
  filterApplied = false,
  children,
}: DataListProps<T>) {
  const layout = getCompoundComponent<DataListLayoutProps<T>>(
    children,
    DataListLayout,
  )?.props.children;

  const elementData = generateElementsFromData(data);
  const headerData = generateHeaderFromData(data);

  console.log(elementData);

  const showEmptyState = !loading && data?.length === 0;
  const [isFilterApplied, setIsFilterApplied] = useState(filterApplied);
  const EmptyStateComponent = useDataListEmptyState({
    children,
    isFilterApplied,
    setIsFilterApplied,
  });

  return (
    <div className={styles.wrapper}>
      {/* List title and counter */}
      <div className={styles.header}>
        {/* Filters here,since it also sticks to the top */}
        {layout && layout(headerData)}
      </div>
      {layout &&
        elementData.map((child, i) => (
          // TODO: Don't use index as key. Might have to force an ID on the data
          <div className={styles.listItem} key={i}>
            {layout(child)}
          </div>
        ))}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;

function useDataListEmptyState({
  children,
  isFilterApplied,
  setIsFilterApplied,
}: {
  children?: React.ReactElement | React.ReactElement[];
  isFilterApplied: boolean;
  setIsFilterApplied: (isFilterApplied: boolean) => void;
}): React.ReactElement<EmptyStateProps> | undefined {
  const EmptyStateComponent = React.Children.toArray(children)
    .filter(getEmptyStateChild)
    .map(cloneEmptyStateComponent);
  if (EmptyStateComponent.length === 1) {
    return EmptyStateComponent[0];
  }

  function cloneEmptyStateComponent(
    child: React.ReactElement<EmptyStateProps>,
  ): React.ReactElement<EmptyStateProps> | undefined {
    if (isValidElement(child)) {
      const overrideEmptyStateProps: EmptyStateProps | undefined =
        isFilterApplied
          ? {
              message: EMPTY_FILTER_RESULTS_MESSAGE,
              action: {
                label: "Clear Filters",
                onClick: () => {
                  setIsFilterApplied(false);
                  alert("Filters Cleared");
                },
              },
            }
          : undefined;
      return React.cloneElement<EmptyStateProps>(
        child,
        overrideEmptyStateProps,
      );
    }
  }
}

function getEmptyStateChild(
  child: React.ReactNode | React.ReactNode[],
): child is React.ReactElement<EmptyStateProps> {
  return (
    isValidElement(child) &&
    typeof child.type === "function" &&
    child.type.name === "DataListEmptyState"
  );
}
