import React from "react";
import classnames from "classnames";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import styles from "./DataListHeaderTile.css";
import { DataListSortingArrows } from "./DataListSortingArrows";
import { DataListSortingOptions } from "./components/DataListSortingOptions";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListHeader,
  DataListObject,
  SortableOptions,
} from "../../DataList.types";

interface DataListHeaderTileProps<T extends DataListObject> {
  readonly headers: DataListHeader<T>;
  readonly headerKey: string;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
}: DataListHeaderTileProps<T>) {
  const { sorting } = useDataListContext();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    React.useState<SortableOptions | null>(null);

  const optionsListRef = useFocusTrap<HTMLUListElement>(isDropDownOpen);

  const sortableItem = sorting?.sortable.find(item => item.key === headerKey);
  const isSortable = Boolean(sortableItem);
  const sortingState = sorting?.state;

  const Tag = isSortable ? "button" : "div";

  return (
    <Tag
      className={classnames(styles.headerLabel, {
        [styles.sortable]: isSortable,
      })}
      onClick={handleOnClick}
    >
      <Text maxLines="single">{headers[headerKey]}</Text>
      {isSortable && sortableItem?.options && isDropDownOpen && (
        <DataListSortingOptions
          options={sortableItem.options}
          selectedOption={selectedSortOption}
          onSelectChange={handleSelectChange}
          optionsListRef={optionsListRef}
          onClose={() => setIsDropDownOpen(false)}
        />
      )}
      {sortingState?.key === headerKey ? (
        <DataListSortingArrows order={sortingState.order} />
      ) : sortingState?.key !== headerKey && isSortable ? (
        <DataListSortingArrows order="none" />
      ) : null}
    </Tag>
  );

  // adjusts sorting state
  function toggleSorting(sortingKey: string, order?: "asc" | "desc") {
    const isSameKey = sortingKey === sortingState?.key;
    const isDescending = sortingState?.order === "desc";

    if (isSameKey && isDescending && order !== "asc") {
      if (order === "desc") return;
      sorting?.onSort(undefined);

      return;
    }

    const sortingOrder = order || (isSameKey && !isDescending ? "desc" : "asc");

    sorting?.onSort({
      key: sortingKey,
      order: sortingOrder,
    });
  }

  // toggle sorting if the header is sortable
  // otherwise toggle the dropdown
  function handleOnClick() {
    if (!isSortable) return;

    if (sortableItem?.options) {
      setIsDropDownOpen(!isDropDownOpen);
    } else {
      toggleSorting(headerKey);
    }
  }

  // updating selected option, trigger sorting, manage dropdown state
  function handleSelectChange(selectedOption: SortableOptions) {
    if (sortableItem) {
      toggleSorting(sortableItem.key, selectedOption.order);
    }
    setSelectedSortOption(selectedOption);

    setIsDropDownOpen(false);
  }
}
