import React from "react";
import { useDataListContext } from "../../context/DataListContext";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { generateHeaderElements, sortBreakpoints } from "../../DataList.utils";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";
import { DataListHeaderCheckbox } from "../DataListLayoutInternal/DataListHeaderCheckbox";

export function DataListHeader() {
  const breakpoints = useResponsiveSizing();
  const {
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
    headers,
    selected,
    layouts,
    layoutBreakpoints,
  } = useDataListContext();

  const headerBreakpoints = sortBreakpoints(
    Object.keys(headerVisibility) as Breakpoints[],
  ).reverse();

  const size =
    headerBreakpoints.find(key => breakpoints[key]) || layoutBreakpoints[0];

  const layout =
    layouts[size] || layouts[layoutBreakpoints[layoutBreakpoints.length - 1]];

  const visible = breakpoints[size] && headerVisibility[size];
  const noItemsSelected = selected?.length === 0;

  if ((!visible && noItemsSelected) || !layout) return null;

  const headerData = generateHeaderElements(headers);
  if (!headerData) return null;

  return (
    <div className={styles.headerTitles}>
      <DataListHeaderCheckbox>{layout(headerData)}</DataListHeaderCheckbox>
    </div>
  );
}
