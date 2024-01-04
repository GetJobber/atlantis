import React from "react";
import classnames from "classnames";
import styles from "./DataListHeaderTile.css";
import { DataListSortingArrows } from "./DataListSortingArrows";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListHeader,
  DataListObject,
  SortableOption,
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
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const [sortingDirection, setSortingDirection] =
    React.useState<SortableOption | null>(null);

  const sortableItem = sorting?.sortable.find(item => item.key === headerKey);
  const isSortable = Boolean(sortableItem);
  const sortingState = sorting?.state;

  const Tag = isSortable ? "button" : "div";

  // without this I'm not able to click anything within the dropdown after opening it
  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // handle change event of dropdown, then hides dropdown
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = event.target.value;
    const selectedDirection = sortableItem?.options?.find(
      (option: SortableOption) => option.label === selectedOption,
    );

    setSortingDirection(selectedDirection || null);
    console.log("Selected Option:", selectedOption);
    console.log("Sorting Direction:", selectedDirection);
    setIsDropdownVisible(false);
  }

  return (
    <Tag
      className={classnames(styles.headerLabel, {
        [styles.sortable]: isSortable,
      })}
      onClick={handleOnClick}
    >
      <Text maxLines="single">{headers[headerKey]}</Text>
      {isSortable && sortableItem?.options && isDropdownVisible && (
        <select
          onClick={handleSelectClick}
          onChange={handleSelectChange}
          value={sortingDirection?.label || ""}
        >
          {sortableItem?.options?.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {sortingState?.key === headerKey ? (
        <DataListSortingArrows
          order={sortingDirection?.order || sortingState.order}
        />
      ) : sortingState?.key !== headerKey && isSortable ? (
        <DataListSortingArrows order="none" />
      ) : null}
    </Tag>
  );

  function toggleSorting(sortingKey: string) {
    const isSameKey = sortingKey === sortingState?.key;

    if (isSameKey && sortingState?.order === "desc") {
      sorting?.onSort(undefined);

      return;
    }

    sorting?.onSort({
      order: isSameKey && sortingState?.order === "asc" ? "desc" : "asc",
      key: sortingKey,
    });
  }

  function handleOnClick() {
    if (!isSortable) return;

    // if sortableItem has options, show dropdown. If there are no options, toggle sorting
    if (sortableItem?.options) {
      setIsDropdownVisible(!isDropdownVisible);
    } else {
      toggleSorting(headerKey);
    }
  }
}
