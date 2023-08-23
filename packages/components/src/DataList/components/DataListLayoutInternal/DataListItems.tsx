import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";
import { DataListLayoutProps } from "../DataListLayout/DataListLayout";

export function DataListItems<T extends DataListObject>({
  layouts,
  mediaMatches,
  data,
}: {
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  mediaMatches?: Record<Breakpoints, boolean>;
  data: T[];
}) {
  const elementData = generateListItemElements(data);

  return (
    <DataListLayoutInternal
      layouts={layouts}
      mediaMatches={mediaMatches}
      renderLayout={(layout: React.ReactElement<DataListLayoutProps<T>>) => {
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
