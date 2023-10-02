import React, { useEffect } from "react";
import { DataListItems } from "../DataListItems";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

export function DataListLayout<T extends DataListObject>({
  children,
  size = "xs",
}: DataListLayoutProps<T>) {
  const { layoutBreakpoints, registerLayout, registerLayoutBreakpoints } =
    useDataListContext<T>();
  const breakpoints = useResponsiveSizing();

  useEffect(() => {
    registerLayoutBreakpoints(size);
  }, [size]);

  useEffect(() => {
    registerLayout(size, children);
  }, [size, children]);

  const sizeIndex = layoutBreakpoints.indexOf(size);
  const nextAvailableSize = layoutBreakpoints[sizeIndex + 1];

  const shouldRenderLayout =
    breakpoints[size] && !breakpoints[nextAvailableSize];

  if (shouldRenderLayout) {
    return <DataListItems size={size} />;
  }

  return null;
}
