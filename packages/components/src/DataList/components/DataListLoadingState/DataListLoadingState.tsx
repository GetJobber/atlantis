import React from "react";
import styles from "./DataListLoadingState.css";
import { Glimmer } from "../../../Glimmer";
import {
  DataListHeader,
  DataListItemType,
  DataListObject,
} from "../../DataList.types";
import { DataListLayoutInternal } from "../DataListLayoutInternal";
import { useLayoutMediaQueries } from "../../hooks/useLayoutMediaQueries";
import { useDataListContext } from "../../context/DataListContext";

interface DataListLoadingStateProps<T extends DataListObject> {
  readonly headers: DataListHeader<T>;
}

export const LOADING_STATE_LIMIT_ITEMS = 10;
export const DATALIST_LOADINGSTATE_ROW_TEST_ID =
  "ATL-DataList-LoadingState-Row";

export function DataListLoadingState<T extends DataListObject>({
  headers,
}: DataListLoadingStateProps<T>) {
  const mediaMatches = useLayoutMediaQueries();
  const { layoutComponents } = useDataListContext();

  const loadingData = new Array(LOADING_STATE_LIMIT_ITEMS).fill(headers);
  type DataListElements = DataListItemType<typeof loadingData>;

  const loadingElements = loadingData.map(item =>
    Object.keys(item).reduce((acc, key: keyof DataListElements) => {
      acc[key] = <Glimmer />;
      return acc;
    }, {} as DataListElements),
  );

  return (
    <DataListLayoutInternal
      layouts={layoutComponents}
      mediaMatches={mediaMatches}
      renderLayout={layout => {
        if (layout.props.size === "xs") {
          return <LoadingStateXSBreakpoint />;
        }

        return (
          <>
            {loadingElements.map((child, i) => (
              <div
                className={styles.loadingItem}
                key={i}
                data-testid={DATALIST_LOADINGSTATE_ROW_TEST_ID}
              >
                {layout.props.children(child)}
              </div>
            ))}
          </>
        );
      }}
    />
  );
}

function LoadingStateXSBreakpoint() {
  const loadingData = new Array(LOADING_STATE_LIMIT_ITEMS).fill(0);
  return (
    <>
      {loadingData.map((_, i) => {
        return (
          <div className={styles.mobileLoadingState} key={i}>
            <Glimmer.Text />
          </div>
        );
      })}
    </>
  );
}
