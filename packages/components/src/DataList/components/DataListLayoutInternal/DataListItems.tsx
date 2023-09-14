import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { DataListItemInternal } from "./DataListItemInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";
import { InternalDataListItemActions } from "../DataListItemActions";

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
  const [hover, setHover] = useState<T["id"]>();

  return (
    <DataListLayoutInternal
      layouts={layouts}
      mediaMatches={mediaMatches}
      renderLayout={layout => {
        return (
          <>
            {elementData.map((child, i) => {
              const item = data[i];

              return (
                <div
                  onMouseEnter={() => setHover(item.id)}
                  onMouseLeave={() => setHover(undefined)}
                  className={styles.listItem}
                  key={`${item.id}`}
                >
                  <DataListItemInternal item={data[i]}>
                    {layout.props.children(child)}
                  </DataListItemInternal>

                  <AnimatePresence>
                    {hover === item.id && (
                      <InternalDataListItemActions item={item} />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
}
