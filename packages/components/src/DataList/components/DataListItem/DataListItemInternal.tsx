import React from "react";
import classNames from "classnames";
import { Checkbox } from "@jobber/components/Checkbox";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { DataListObject } from "@jobber/components/DataList/DataList.types";
import styles from "../../DataList.css";

interface ListItemInternalProps<T extends DataListObject> {
  readonly children: JSX.Element;
  readonly item: T;
}

export function DataListItemInternal<T extends DataListObject>({
  children,
  item,
}: ListItemInternalProps<T>) {
  const { selected, onSelect } = useDataListContext();

  const hasSelectedAll = !Array.isArray(selected);
  const ids = Array.isArray(selected) ? selected : selected?.unselected || [];

  if (selected !== undefined && onSelect) {
    return (
      <div
        className={classNames(styles.selectable, {
          [styles.selected]: hasSelectedAll || ids?.length,
        })}
      >
        {children}
        <Checkbox checked={ids.includes(item.id)} onChange={handleChange} />
      </div>
    );
  }

  return children;

  function handleChange() {
    if (ids?.includes(item.id)) {
      onSelect?.(ids?.filter(id => id !== item.id));
    } else if (ids) {
      onSelect?.([...ids, item.id]);
    }
  }
}
