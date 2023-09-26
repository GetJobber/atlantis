import React from "react";
import classNames from "classnames";
import { Checkbox } from "@jobber/components/Checkbox";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { DataListObject } from "@jobber/components/DataList/DataList.types";
import styles from "@jobber/components/DataList/DataList.css";

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
