import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import {
  DataListHeader as DataListHeaderType,
  DataListItemTypeFromHeader,
  DataListObject,
  DataListProps,
} from "../../DataList.types";
import { sortSizeProp } from "../../DataList.utils";
import { DataListLayoutProps } from "../DataListLayout/DataListLayout";

export function DataListHeader<T extends DataListObject>({
  layouts,
  mediaMatches,
  headerData,
  headerVisibility,
}: {
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  mediaMatches?: Record<Breakpoints, boolean>;
  headerData?: DataListItemTypeFromHeader<T, DataListHeaderType<T>>;
  headerVisibility: NonNullable<DataListProps<T>["headerVisibility"]>;
}) {
  return (
    <DataListLayoutInternal
      layouts={layouts}
      renderLayout={(layout: React.ReactElement<DataListLayoutProps<T>>) => {
        const matchingMediaQueries = Object.keys(mediaMatches || {}).filter(
          (key): key is Breakpoints => !!mediaMatches?.[key as Breakpoints],
        );

        const sortedVisibleBreakpoints = sortSizeProp(matchingMediaQueries);

        const showHeader = sortedVisibleBreakpoints.reduce(
          (previousVisibility, breakpoint) => {
            return headerVisibility[breakpoint] ?? previousVisibility;
          },
          true,
        );
        return (
          (showHeader && headerData && (
            <div className={styles.header}>
              {layout.props.children(headerData)}
            </div>
          )) || <></>
        );
      }}
      mediaMatches={mediaMatches}
    />
  );
}
