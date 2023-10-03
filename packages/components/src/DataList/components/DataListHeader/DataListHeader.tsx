import React from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { Breakpoints } from "@jobber/components/DataList/DataList.const";
import styles from "@jobber/components/DataList/DataList.css";
import {
  generateHeaderElements,
  sortBreakpoints,
} from "@jobber/components/DataList/DataList.utils";
import { useResponsiveSizing } from "@jobber/components/DataList/hooks/useResponsiveSizing";
import { DataListHeaderCheckbox } from "./DataListHeaderCheckbox";

export function DataListHeader() {
  const breakpoints = useResponsiveSizing();
  const {
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
    headers,
    selected,
    layouts,
    layoutBreakpoints,
  } = useDataListContext();

  const size = getVisibleSize();
  const layout = getLayout();

  const visible = headerVisibility[size];
  const noItemsSelected = selected?.length === 0;

  if ((!visible && noItemsSelected) || !layout) return null;

  const headerData = generateHeaderElements(headers);
  if (!headerData) return null;

  return (
    <div className={styles.headerTitles}>
      <DataListHeaderCheckbox>{layout(headerData)}</DataListHeaderCheckbox>
    </div>
  );

  function getLayout() {
    if (layoutBreakpoints.includes(size)) {
      return layouts[size];
    }

    const lastItem = layoutBreakpoints.length - 1;
    return layouts[layoutBreakpoints[lastItem]];
  }

  function getVisibleSize() {
    const visibilityKeys = Object.keys(headerVisibility) as Breakpoints[];
    const headerBreakpoints = sortBreakpoints(visibilityKeys).reverse();
    const visibleHeaderSize = headerBreakpoints.find(key => breakpoints[key]);

    return visibleHeaderSize || layoutBreakpoints[0];
  }
}
