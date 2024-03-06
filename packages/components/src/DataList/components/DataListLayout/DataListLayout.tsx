import React, { useEffect } from "react";
import { DataListItems } from "@jobber/components/DataList/components/DataListItems";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import {
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { useActiveLayout } from "../../hooks/useActiveLayout";

export function DataListLayout<T extends DataListObject>({
  children,
  size = "xs",
}: DataListLayoutProps<T>) {
  const { registerLayout, loadingState, layouts } = useDataListContext<T>();
  const { activeBreakpoint } = useActiveLayout();

  useEffect(() => {
    if (layouts[size]) return;
    registerLayout(size, children);
  }, [size, children]);

  const shouldRenderList = size === activeBreakpoint;

  if (loadingState !== "initial" && shouldRenderList) {
    return <DataListItems size={size} />;
  }

  return null;
}
