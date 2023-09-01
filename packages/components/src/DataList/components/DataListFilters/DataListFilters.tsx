import React, { ReactElement } from "react";
import styles from "./DataListFilters.css";
import { useDataListContext } from "../../context/DataListContext";
import { getCompoundComponent } from "../../DataList.utils";

interface DataListFiltersProps {
  readonly children: ReactElement | ReactElement[];
}

// This component is meant to capture the props of the DataList.Filters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListFilters(_: DataListFiltersProps) {
  return null;
}

/**
 * Renders the DataList.Filters component
 */
export function InternalDataListFilters() {
  const { children: parentChildren } = useDataListContext();
  const component = getCompoundComponent<DataListFiltersProps>(
    parentChildren,
    DataListFilters,
  );
  if (!component) return null;

  const { children } = component.props;

  return <div className={styles.filters}>{children}</div>;
}
