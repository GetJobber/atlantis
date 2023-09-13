import React from "react";
import classnames from "classnames";
import styles from "./DataListHeaderTile.css";
import { DataListHeader, DataListObject } from "../../DataList.types";
import { Text } from "../../../Text";
import { Icon } from "../../../Icon";
import { useDataListContext } from "../../context/DataListContext";

interface DataListHeaderTileProps<T extends DataListObject> {
  headers: DataListHeader<T>;
  headerKey: string;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
}: DataListHeaderTileProps<T>) {
  const { sorting } = useDataListContext();

  const isSortable = sorting?.sortable.includes(headerKey);
  const sortingState = sorting?.state;

  function toggleSorting(sortingKey: string) {
    if (sortingKey === sortingState?.key) {
      sorting?.onSort({
        direction: sortingState.direction === "asc" ? "desc" : "asc",
        key: sortingKey,
      });
    } else {
      sorting?.onSort({ direction: "asc", key: sortingKey });
    }
  }

  return (
    <div
      className={classnames(styles.headerLabel, {
        [styles.sortable]: isSortable,
      })}
      onClick={isSortable ? () => toggleSorting(headerKey) : undefined}
    >
      <Text variation="subdued" maxLines="single" size="small">
        {headers[headerKey]}
      </Text>
      {sortingState?.key === headerKey && (
        <SortingArrows order={sortingState.direction} />
      )}
    </div>
  );
}

function SortingArrows({ order }: { order: "asc" | "desc" | "none" }) {
  if (order === "none") return <></>;

  return (
    <div>
      <span className={styles.arrowUp}>
        <Icon
          name="arrowUp"
          color={order === "asc" ? "greyBlue" : "blue"}
          size="small"
        />
      </span>
      <span className={styles.arrowDown}>
        <Icon
          name="arrowDown"
          color={order === "desc" ? "greyBlue" : "blue"}
          size="small"
        />
      </span>
    </div>
  );
}
