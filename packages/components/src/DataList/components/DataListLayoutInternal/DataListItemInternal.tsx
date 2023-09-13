import classNames from "classnames";
import React from "react";
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.css";
import { DataListObject } from "../../DataList.types";

export function ListItemInternal<T extends DataListObject>({
  children,
  item,
}: {
  children: JSX.Element;
  item: T;
}) {
  const { selected, onSelect } = useDataListContext();

  if (typeof selected !== "undefined" && onSelect) {
    return (
      <div
        className={classNames(styles.selectable, {
          [styles.selected]: selected?.length,
        })}
      >
        <Checkbox
          checked={selected?.includes(item.id)}
          onChange={() => {
            if (selected?.includes(item.id)) {
              onSelect?.(selected?.filter(id => id !== item.id));
            } else {
              onSelect?.([...selected, item.id]);
            }
          }}
        />
        {children}
      </div>
    );
  }
  return children;
}
