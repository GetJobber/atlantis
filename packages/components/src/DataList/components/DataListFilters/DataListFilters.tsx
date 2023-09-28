import React, { ReactElement } from "react";
import { DataListSort } from "./components/DataListSort";
import { DataListOverflowFade } from "./components/DataListOverflowFade/DataListOverflowFade";
import { useDataListContext } from "../../context/DataListContext";
import { getCompoundComponent } from "../../DataList.utils";
import { useShowHeader } from "../../hooks/useShowHeader";

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
  const showHeader = useShowHeader();
  const showSortButton = !showHeader;
  const component = getCompoundComponent<DataListFiltersProps>(
    parentChildren,
    DataListFilters,
  );

  if (!showSortButton && !component) return null;

  const children = component?.props.children;

  return (
    <DataListOverflowFade>
      {children && children}

      {showSortButton && <DataListSort />}
    </DataListOverflowFade>
  );
}
