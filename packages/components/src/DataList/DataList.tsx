import React, { isValidElement, useState } from "react";
import styles from "./DataList.css";
import { EmptyState, EmptyStateProps } from "./components/EmptyState";

export interface DataListProps {
  /**
   * Tell the DataList if the data loading
   * @default false
   */
  loading?: boolean;
  items: any[];

  /**
   * Temporary prop for setting default state for if filters are applied
   * @default false
   */
  filterApplied?: boolean;

  children?: React.ReactElement | React.ReactElement[];
}
export const EMPTY_FILTER_RESULTS_MESSAGE = "No Results for Selected Filters";
export const EMPTY_FILTER_RESULTS_ACTION_LABEL = "Clear Filters";

export function DataList({
  loading = false,
  items,
  filterApplied = false,
  children,
}: DataListProps) {
  const showEmptyState = !loading && items?.length === 0;
  const [isFilterApplied, setIsFilterApplied] = useState(filterApplied);
  const EmptyStateComponent = useDataListEmptyState({
    children,
    isFilterApplied,
    setIsFilterApplied,
  });

  return (
    <div className={styles.wrapper}>
      {/* List title and counter */}
      {/* List header */}
      {/* List content */}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

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
