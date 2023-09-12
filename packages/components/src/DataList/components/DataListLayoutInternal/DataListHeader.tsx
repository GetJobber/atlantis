import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import {
  DataListHeader as DataListHeaderType,
  DataListItemTypeFromHeader,
  DataListObject,
} from "../../DataList.types";
import { sortSizeProp } from "../../DataList.utils";
import { useDataListContext } from "../../context/DataListContext";
import { useLayoutMediaQueries } from "../../hooks/useLayoutMediaQueries";

interface DataListHeaderProps<T extends DataListObject> {
  readonly headerData?: DataListItemTypeFromHeader<T, DataListHeaderType<T>>;
}

export function DataListHeader<T extends DataListObject>({
  headerData,
}: DataListHeaderProps<T>) {
  const {
    layoutComponents,
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
  } = useDataListContext();

  const mediaMatches = useLayoutMediaQueries();

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
      layouts={layoutComponents}
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
