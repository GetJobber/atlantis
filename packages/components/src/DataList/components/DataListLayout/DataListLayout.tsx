import React, { useEffect } from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

export function DataListLayout<T extends DataListObject>({
  children,
  size = "xs",
}: DataListLayoutProps<T>) {
  const { layoutBreakpoints, setVisibleLayout, registerLayoutBreakpoints } =
    useDataListContext<T>();

  useEffect(() => {
    registerLayoutBreakpoints(size);
  }, [size]);

  const breakpoints = useResponsiveSizing();

  const sizeIndex = layoutBreakpoints.indexOf(size);
  const nextAvailableSize = layoutBreakpoints[sizeIndex + 1];

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
