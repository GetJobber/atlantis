import React from "react";
import { Glimmer } from "@jobber/components/Glimmer";
import {
  DataListItemType,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { useActiveLayout } from "@jobber/components/DataList/hooks/useActiveLayout";
import styles from "./DataListLoadingState.css";

export const LOADING_STATE_LIMIT_ITEMS = 10;
export const DATALIST_LOADINGSTATE_ROW_TEST_ID =
  "ATL-DataList-LoadingState-Row";

export function DataListLoadingState() {
  const { headers } = useDataListContext();
  const { layout, activeBreakpoint } = useActiveLayout();

  if (!layout) return null;

  const glimmerSize = activeBreakpoint === "xs" ? "small" : "large";
  const glimmersFromHeader = Object.keys(headers).reduce(
    (data: DataListItemType<DataListObject[]>, key) => ({
      ...data,
      [key]: (
        <div className={styles.glimmer}>
          <Glimmer size={glimmerSize} />
        </div>
      ),
    }),
    {},
  );

  const loadingData = new Array(LOADING_STATE_LIMIT_ITEMS).fill(
    glimmersFromHeader,
  );

  return (
    <div className={styles.wrapper}>
      {loadingData.map((child, i) => (
        <div
          key={i}
          className={styles.loadingItem}
          data-testid={DATALIST_LOADINGSTATE_ROW_TEST_ID}
        >
          {layout(child)}
        </div>
      ))}
    </div>
  );
}
