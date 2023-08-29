import React from "react";
import styles from "./DataListLoadingState.css";
import { Glimmer } from "../../../Glimmer";
import {
  Breakpoints,
  DataListHeader,
  DataListItemType,
  DataListObject,
} from "../../DataList.types";
import { DataListLayoutProps } from "../DataListLayout";
import { DataListLayoutInternal } from "../DataListLayoutInternal";

interface DataListLoadingStateProps<T extends DataListObject> {
  readonly loading: boolean;
  readonly headers: DataListHeader<T>;
  readonly layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  readonly mediaMatches?: Record<Breakpoints, boolean>;
}

export const LOADING_STATE_LIMIT_ITEMS = 10;
export const DATALIST_LOADINGSTATE_ROW_TEST_ID =
  "ATL-DataList-LoadingState-Row";

export function DataListLoadingState<T extends DataListObject>({
  loading,
  headers,
  layouts,
  mediaMatches,
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
    <DataListLayoutInternal
      layouts={layouts}
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
            <div className={styles.firstMobileGlimmer}>
              <Glimmer size="small" />
            </div>
            <div>
              <Glimmer size="small" />
            </div>
            <div className={styles.thirdMobileGlimmer}>
              <Glimmer size="small" />
            </div>
          </div>
        );
      })}
    </>
  );
}
