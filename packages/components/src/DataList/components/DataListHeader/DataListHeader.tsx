import React from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { Breakpoints } from "@jobber/components/DataList/DataList.const";
import {
  generateHeaderElements,
  sortBreakpoints,
} from "@jobber/components/DataList/DataList.utils";
import { useResponsiveSizing } from "@jobber/components/DataList/hooks/useResponsiveSizing";
import { DataListHeaderCheckbox } from "./DataListHeaderCheckbox";
import { useActiveLayout } from "../../hooks/useActiveLayout";
import { useBatchSelect } from "../../hooks/useBatchSelect";
import styles from "../../DataList.module.css";
import { DataListObject, LayoutRenderer } from "../../DataList.types";

export function DataListHeader() {
  const breakpoints = useResponsiveSizing();
  const {
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
    headers,
    layoutBreakpoints,
  } = useDataListContext();
  const { hasAtLeastOneSelected, canSelect, canSelectAll } = useBatchSelect();

  const size = getVisibleSize();
  const { layout } = useActiveLayout();

  const visible = headerVisibility[size];

  if (
    isHeaderHidden(
      visible,
      hasAtLeastOneSelected,
      layout,
      canSelect,
      canSelectAll,
    )
  ) {
    return null;
  }

  const headerData = generateHeaderElements(headers);
  if (!headerData || !layout) return null;

  return (
    <div className={styles.headerTitles}>
      <DataListHeaderCheckbox>{layout(headerData)}</DataListHeaderCheckbox>
    </div>
  );

  function getVisibleSize() {
    const visibilityKeys = Object.keys(headerVisibility) as Breakpoints[];
    const headerBreakpoints = sortBreakpoints(visibilityKeys).reverse();
    const visibleHeaderSize = headerBreakpoints.find(key => breakpoints[key]);

    return visibleHeaderSize || layoutBreakpoints[0];
  }
}

function isHeaderHidden(
  visible: boolean | undefined,
  hasAtLeastOneSelected: boolean,
  layout: LayoutRenderer<DataListObject> | undefined,
  canSelect: boolean,
  canSelectAll: boolean,
) {
  // When the horizontal area is too small and the data starts to wrap
  // we want to hide the headers that will no longer align with the content

  // The exception is when we have onSelectAll AND one or more are selected
  // because then we show the "header" in its select-all UI variation state
  const isHiddenForSelect = !visible && canSelect && !canSelectAll;
  const isHiddenForSelectAll = !visible && !hasAtLeastOneSelected;

  return !layout || isHiddenForSelect || isHiddenForSelectAll;
}
