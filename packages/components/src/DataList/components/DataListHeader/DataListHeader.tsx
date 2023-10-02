import React from "react";
import { DataListHeaderCheckbox } from "./DataListHeaderCheckbox";
import { useDataListContext } from "../../context/DataListContext";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { generateHeaderElements, sortBreakpoints } from "../../DataList.utils";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

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
