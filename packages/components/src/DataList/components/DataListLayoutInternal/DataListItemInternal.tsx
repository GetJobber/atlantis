import classNames from "classnames";
import React from "react";
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.css";
import { DataListObject } from "../../DataList.types";

interface ListItemInternalProps<T extends DataListObject> {
  readonly children: JSX.Element;
  readonly item: T;
}

export function DataListItemInternal<T extends DataListObject>({
  children,
  item,
}: ListItemInternalProps<T>) {
  const { selected, onSelect } = useDataListContext();

  if (selected !== undefined && onSelect) {
    return (
      <div
        className={classNames(styles.selectable, {
          [styles.selected]: selected?.length,
        })}
      >
        <Checkbox
          checked={selected?.includes(item.id)}
          onChange={handleChange}
        />
        {children}
      </div>
    );
  }

  return children;

  function handleChange() {
    if (selected?.includes(item.id)) {
      onSelect?.(selected?.filter(id => id !== item.id));
    } else if (selected) {
      onSelect?.([...selected, item.id]);
    }
  }
}
