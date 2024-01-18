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
import styles from "../../DataList.css";

export function DataListHeader() {
  const breakpoints = useResponsiveSizing();
  const {
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
    headers,
    layoutBreakpoints,
  } = useDataListContext();
  const { hasAtLeastOneSelected } = useBatchSelect();

  const size = getVisibleSize();
  const { layout } = useActiveLayout();

  const visible = headerVisibility[size];

  if ((!visible && !hasAtLeastOneSelected) || !layout) return null;

  const headerData = generateHeaderElements(headers);
  if (!headerData) return null;

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
