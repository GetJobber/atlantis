import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { DataListItemInternal } from "./DataListItemInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";
import { InternalDataListItemActions } from "../DataListItemActions";
import { DataListLayoutContext } from "../../context/DataListLayoutContext";

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
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);
  const [activeID, setActiveID] = useState<T["id"]>();
  const [activeItem, setActiveItem] = useState<T>();

  return (
    <DataListLayoutContext.Provider
      value={{
        isInLayoutProvider: true,
        hasInLayoutActions,
        setHasInLayoutActions,
        activeItem,
      }}
    >
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
                    // Set the active item whenever the element or any of its
                    // children are clicked
                    onClick={handleSetActiveItem(item)}
                    onMouseEnter={handleSetActiveItem(item)}
                    onMouseLeave={handleUnsetActiveItem}
                    className={styles.listItem}
                    key={item.id}
                  >
                    <DataListItemInternal item={data[i]}>
                      {layout.props.children(child)}
                    </DataListItemInternal>

                    <AnimatePresence>
                      {activeID === item.id && !hasInLayoutActions && (
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
    </DataListLayoutContext.Provider>
  );

  function handleSetActiveItem(item: T) {
    return () => {
      setActiveID(item.id);
      setActiveItem(item);
    };
  }

  function handleUnsetActiveItem() {
    setActiveID(undefined);
    setActiveItem(undefined);
  }
}
