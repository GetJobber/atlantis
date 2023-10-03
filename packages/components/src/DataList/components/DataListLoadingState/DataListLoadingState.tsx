import React from "react";
import { Glimmer } from "@jobber/components/Glimmer";
import { DataListItemType } from "@jobber/components/DataList/DataList.types";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { useResponsiveSizing } from "@jobber/components/DataList/hooks/useResponsiveSizing";
import styles from "./DataListLoadingState.css";

export const LOADING_STATE_LIMIT_ITEMS = 10;
export const DATALIST_LOADINGSTATE_ROW_TEST_ID =
  "ATL-DataList-LoadingState-Row";

export function DataListLoadingState() {
  const { layoutBreakpoints, layouts, headers } = useDataListContext();
  const breakpoints = useResponsiveSizing();
  const reversedLayoutBreakpoints = [...layoutBreakpoints].reverse();
  const active =
    reversedLayoutBreakpoints.find(key => breakpoints[key]) ||
    layoutBreakpoints[0];
  const layout = layouts[active];

  if (!layout) return null;

  const loadingData = new Array(LOADING_STATE_LIMIT_ITEMS).fill(headers);
  type DataListElements = DataListItemType<typeof loadingData>;

  const loadingElements = loadingData.map(item =>
    Object.keys(item).reduce(
      (acc: DataListElements, key) => ({
        ...acc,
        [key]: (
          <div style={{ width: "100%", minWidth: 40 }}>
            <Glimmer size={active === "xs" ? "small" : "base"} />
          </div>
        ),
      }),
      {},
    ),
  );

  return (
    <>
      {loadingElements.map((child, i) => (
        <div
          key={i}
          className={styles.loadingItem}
          data-testid={DATALIST_LOADINGSTATE_ROW_TEST_ID}
        >
          {layout(child)}
        </div>
      ))}
    </>
  );
}
