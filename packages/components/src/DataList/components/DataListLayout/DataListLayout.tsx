import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { sortBreakpoints } from "../../DataList.utils";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

export function DataListLayout<T extends DataListObject>({
  children: layout,
  size = "xs",
}: DataListLayoutProps<T>) {
  const { layoutComponents } = useDataListContext<T>();
  const breakpoints = useResponsiveSizing();

  const layoutSizes = layoutComponents?.reduce(
    (acc: (keyof typeof breakpoints)[], curr) => [
      ...acc,
      curr.props.size || "xs",
    ],
    [],
  );
  const sortedLayoutSizes = sortBreakpoints(layoutSizes || []);
  const sizeIndex = sortedLayoutSizes.indexOf(size);
  const nextAvailableSize = sortedLayoutSizes[sizeIndex + 1];

  if (breakpoints[size] && !breakpoints[nextAvailableSize]) {
    return <DataListLayoutInternal layout={layout} />;
  }

  return null;
}
