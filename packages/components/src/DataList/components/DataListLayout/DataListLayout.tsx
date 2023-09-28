import React, { useEffect } from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { sortBreakpoints } from "../../DataList.utils";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

export function DataListLayout<T extends DataListObject>({
  children,
  size = "xs",
}: DataListLayoutProps<T>) {
  const { layoutComponents, setVisibleLayout } = useDataListContext<T>();
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

  const shouldRenderLayout =
    breakpoints[size] && !breakpoints[nextAvailableSize];

  useEffect(() => {
    if (shouldRenderLayout) {
      setVisibleLayout({ size, children });
    }
  }, [shouldRenderLayout]);

  if (shouldRenderLayout) {
    return <DataListLayoutInternal />;
  }

  return null;
}
