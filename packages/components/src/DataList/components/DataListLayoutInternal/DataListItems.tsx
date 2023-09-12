import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import styles from "../../DataList.css";
import { DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";
import { useLayoutMediaQueries } from "../../hooks/useLayoutMediaQueries";
import { useDataListContext } from "../../context/DataListContext";

interface DataListItemsProps<T extends DataListObject> {
  readonly data: T[];
}

export function DataListItems<T extends DataListObject>({
  data,
}: DataListItemsProps<T>) {
  const { layoutComponents } = useDataListContext();
  const mediaMatches = useLayoutMediaQueries();

  const elementData = generateListItemElements(data);

  return (
    <DataListLayoutInternal
      layouts={layoutComponents}
      mediaMatches={mediaMatches}
      renderLayout={layout => {
        return (
          <>
            {elementData.map((child, i) => {
              return (
                <div className={styles.listItem} key={`${data[i].id}`}>
                  {layout.props.children(child)}
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
}
