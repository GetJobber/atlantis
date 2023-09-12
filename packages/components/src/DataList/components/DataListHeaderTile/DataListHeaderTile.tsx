import React, { useEffect, useState } from "react";
import styles from "./DataListHeaderTile.css";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListHeader,
  DataListObject,
  SortingDirection,
} from "../../DataList.types";
import { Text } from "../../../Text";
import { Icon } from "../../../Icon";
import { useDataListSorting } from "../../hooks/useDataListSorting";

interface DataListHeaderTileProps<T extends DataListObject> {
  headers: DataListHeader<T>;
  headerKey: string;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
}: DataListHeaderTileProps<T>) {
  const { toggleSorting, sorting } = useDataListSorting();

  return (
    <div
      className={styles.headerLabel}
      onClick={() => toggleSorting(headerKey)}
    >
      <Text variation="subdued" maxLines="single" size="small">
        {headers[headerKey]}
      </Text>
      {sorting.key === headerKey && <SortingArrows order={sorting.direction} />}
    </div>
  );
}

function SortingArrows({ order }: { order: SortingDirection }) {
  if (order === SortingDirection.None) return <></>;

  return (
    <div>
      <span className={styles.arrowUp}>
        <Icon
          name="arrowUp"
          color={order === SortingDirection.Ascending ? "greyBlue" : "blue"}
          size="small"
        />
      </span>
      <span className={styles.arrowDown}>
        <Icon
          name="arrowDown"
          color={order === SortingDirection.Descending ? "greyBlue" : "blue"}
          size="small"
        />
      </span>
    </div>
  );
}
