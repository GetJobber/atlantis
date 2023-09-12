import React from "react";
import classNames from "classnames";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";
import { useDataListContext } from "../../context/DataListContext";
import { Checkbox } from "../../../Checkbox";

interface DataListItemsProps<T extends DataListObject> {
  readonly layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  readonly mediaMatches?: Record<Breakpoints, boolean>;
  readonly data: T[];
}

export function DataListItems<T extends DataListObject>({
  layouts,
  mediaMatches,
  data,
}: DataListItemsProps<T>) {
  const elementData = generateListItemElements(data);

  return (
    <DataListLayoutInternal
      layouts={layouts}
      mediaMatches={mediaMatches}
      renderLayout={layout => {
        return (
          <>
            {elementData.map((child, i) => {
              return (
                <div className={styles.listItem} key={`${data[i].id}`}>
                  <ListItemInternal item={data[i]}>
                    {layout.props.children(child)}
                  </ListItemInternal>
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
}

function ListItemInternal<T extends DataListObject>({
  children,
  item,
}: {
  children: JSX.Element;
  item: T;
}) {
  const { selectedItems, actions, onSelectChange } = useDataListContext();

  if (actions) {
    return (
      <div
        className={classNames(styles.selectable, [
          selectedItems.length > 0 && styles.selected,
        ])}
      >
        <Checkbox
          checked={selectedItems?.includes(item.id)}
          onChange={() => {
            onSelectChange?.([...selectedItems, item.id]);
          }}
        />
        {children}
      </div>
    );
  }
  return children;
}
