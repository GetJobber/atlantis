import React, { useEffect } from "react";
import { DataListItems } from "../DataListItems";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { useActiveLayout } from "../../hooks/useActiveLayout";

export function DataListLayout<T extends DataListObject>({
  children,
  size = "xs",
}: DataListLayoutProps<T>) {
  const { registerLayout, loadingState } = useDataListContext<T>();
  const { activeBreakpoint } = useActiveLayout();

  useEffect(() => {
    registerLayout(size, children);
  }, [size, children]);

  const shouldRenderList = size === activeBreakpoint;

  if (loadingState !== "initial" && shouldRenderList) {
    return <DataListItems size={size} />;
  }

  return null;
}
