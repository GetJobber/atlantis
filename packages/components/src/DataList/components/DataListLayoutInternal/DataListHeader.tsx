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
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";

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
  const { data, selected = [], onSelectAll } = useDataListContext();
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

  const isAllSelected = data.length > 0 && data.length === selected?.length;

  return (
    <DataListLayoutInternal
      layouts={layouts}
      renderLayout={layout => {
        return (
          <div className={styles.headerTitles}>
            <Checkbox
              checked={isAllSelected}
              indeterminate={selected?.length > 0 && !isAllSelected}
              onChange={onSelectAll}
            />

            {layout.props.children(headerData)}
          </div>
        );
      }}
      mediaMatches={mediaMatches}
    />
  );
}
