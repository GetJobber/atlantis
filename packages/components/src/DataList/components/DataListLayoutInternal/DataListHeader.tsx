import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import {
  DataListHeader as DataListHeaderType,
  DataListItemTypeFromHeader,
  DataListLayoutProps,
  DataListObject,
  DataListProps,
} from "../../DataList.types";
import { sortSizeProp } from "../../DataList.utils";

interface DataListHeaderProps<T extends DataListObject> {
  readonly layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  readonly mediaMatches?: Record<Breakpoints, boolean>;
  readonly headerData?: DataListItemTypeFromHeader<T, DataListHeaderType<T>>;
  readonly headerVisibility: NonNullable<DataListProps<T>["headerVisibility"]>;
}

export function DataListHeader<T extends DataListObject>({
  layouts,
  mediaMatches,
  headerData,
  headerVisibility,
}: DataListHeaderProps<T>) {
  const matchingMediaQueries = Object.keys(mediaMatches || {}).filter(
    (key): key is Breakpoints => !!mediaMatches?.[key as Breakpoints],
  );
  const sortedVisibleBreakpoints = sortSizeProp(matchingMediaQueries);

  // Determines if the header should be visible based on the headerVisibility
  const showHeader = sortedVisibleBreakpoints.reduce(
    (previousVisibility, breakpoint) => {
      return headerVisibility[breakpoint] ?? previousVisibility;
    },
    true,
  );

  if (!showHeader || !headerData) return <></>;

  return (
    <DataListLayoutInternal
      layouts={layouts}
      renderLayout={layout => {
        return (
          <div className={styles.headerTitles}>
            {layout.props.children(headerData)}
          </div>
        );
      }}
      mediaMatches={mediaMatches}
    />
  );
}
