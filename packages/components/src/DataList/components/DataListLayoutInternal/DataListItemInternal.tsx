import classNames from "classnames";
import React from "react";
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.css";
import { DataListObject } from "../../DataList.types";

interface ListItemInternalProps<T extends DataListObject> {
  children: JSX.Element;
  data: T;
}
export function DataListItemInternal<T extends DataListObject>({
  children,
  data,
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
          checked={selected?.includes(data.id)}
          onChange={handleChange}
        />
        {children}
      </div>
    );
  }

  return children;

  function handleChange() {
    if (selected?.includes(data.id)) {
      onSelect?.(selected?.filter(id => id !== data.id));
    } else if (selected) {
      onSelect?.([...selected, data.id]);
    }
  }
}
