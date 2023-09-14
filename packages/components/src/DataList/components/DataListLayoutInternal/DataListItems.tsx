import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { DataListItemInternal } from "./DataListItemInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";

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
                  <DataListItemInternal item={data[i]}>
                    {layout.props.children(child)}
                  </DataListItemInternal>
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
}
