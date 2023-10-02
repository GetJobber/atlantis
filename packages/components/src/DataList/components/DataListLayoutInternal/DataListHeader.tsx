import React from "react";
import classNames from "classnames";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { DataListHeaderCheckbox } from "./DataListHeaderCheckbox";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import {
  DataListHeader as DataListHeaderType,
  DataListItemTypeFromHeader,
  DataListLayoutProps,
  DataListObject,
  DataListProps,
} from "../../DataList.types";
import { useShowHeader } from "../../hooks/useShowHeader";
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
}: DataListHeaderProps<T>) {
  const showHeader = useShowHeader();
  const { selected } = useDataListContext();

  const noItemsSelected = selected?.length === 0;

  if ((!showHeader && noItemsSelected) || !headerData) return null;

  return (
    <DataListLayoutInternal
      layouts={layouts}
      mediaMatches={mediaMatches}
      renderLayout={layout => (
        <div className={classNames(styles.headerTitles)}>
          <DataListHeaderCheckbox>
            {layout.props.children(headerData)}
          </DataListHeaderCheckbox>
        </div>
      )}
    />
  );
}
