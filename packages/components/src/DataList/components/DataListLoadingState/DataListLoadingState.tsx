import React from "react";
import styles from "./DataListLoadingState.css";
import { Glimmer } from "../../../Glimmer";
import {
  DataListHeader,
  DataListItemType,
  DataListObject,
} from "../../DataList.types";

interface DataListLoadingStateProps<T extends DataListObject> {
  loading: boolean;
  headers: DataListHeader<T>;
  layout: ((item: DataListItemType<T[]>) => JSX.Element) | undefined;
}

export const LOADING_STATE_LIMIT_ITEMS = 10;
export const DATALIST_LOADINGSTATE_ROW_TEST_ID =
  "ATL-DataList-LoadingState-Row";

export function DataListLoadingState<T extends DataListObject>({
  loading,
  headers,
  layout,
}: DataListLoadingStateProps<T>) {
  if (!loading) return null;

  const loadingData = new Array(LOADING_STATE_LIMIT_ITEMS).fill(headers);
  type DataListElements = DataListItemType<typeof loadingData>;

  const loadingElements = loadingData.map(item =>
    Object.keys(item).reduce((acc, key: keyof DataListElements) => {
      acc[key] = <Glimmer />;
      return acc;
    }, {} as DataListElements),
  );

  return (
    <>
      {layout &&
        loadingElements.map((child, i) => (
          <div
            className={styles.loadingItem}
            key={i}
            data-testid={DATALIST_LOADINGSTATE_ROW_TEST_ID}
          >
            {layout(child)}
          </div>
        ))}
    </>
  );
}
