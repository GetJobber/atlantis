import React, { ReactElement } from "react";
import { getCompoundComponent } from "../../DataList.utils";
import { useDataListContext } from "../../context/DataListContext";

interface DataListStatusBarProps {
  readonly children: ReactElement | ReactElement[];
}

// This component is meant to capture the props of the DataList.Filters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListStatusBar(_: DataListStatusBarProps) {
  return null;
}

/**
 * Renders the DataList.StatusBar component
 */

export function InternalDataListStatusBar() {
  const { children: parentChildren } = useDataListContext();
  const component = getCompoundComponent<DataListStatusBarProps>(
    parentChildren,
    DataListStatusBar,
  );

  if (!component) return null;

  const children = component?.props.children;

  return <>{children}</>;
}
