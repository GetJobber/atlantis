import React, { useEffect } from "react";
import { DataListItems } from "@jobber/components/DataList/components/DataListItems";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import {
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { useResponsiveSizing } from "@jobber/components/DataList/hooks/useResponsiveSizing";

export function DataListLayout<T extends DataListObject>({
  children,
  size = "xs",
}: DataListLayoutProps<T>) {
  const {
    layoutBreakpoints,
    registerLayout,
    registerLayoutBreakpoints,
    loadingState,
  } = useDataListContext<T>();
  const breakpoints = useResponsiveSizing();

  useEffect(() => {
    registerLayoutBreakpoints(size);
  }, [size]);

  useEffect(() => {
    registerLayout(size, children);
  }, [size, children]);

  const sizeIndex = layoutBreakpoints.indexOf(size);
  const nextAvailableSize = layoutBreakpoints[sizeIndex + 1];

  const shouldRenderList = breakpoints[size] && !breakpoints[nextAvailableSize];

  if (loadingState !== "initial" && shouldRenderList) {
    return <DataListItems size={size} />;
  }

  return null;
}
