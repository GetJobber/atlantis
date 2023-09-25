import React, { Children, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { DataListItemInternal } from "./DataListItemInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import { DataListLayoutProps, DataListObject } from "../../DataList.types";
import { generateListItemElements } from "../../DataList.utils";
import { InternalDataListItemActions } from "../DataListItemActions";
import { useDataListContext } from "../../context/DataListContext";
import { DataListActionsMenu } from "../DataListActionsMenu";
import { InternalDataListAction } from "../DataListAction";
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
  const { itemActionComponent } = useDataListContext();
  const elementData = useMemo(() => generateListItemElements(data), [data]);
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);
  const [activeID, setActiveID] = useState<T["id"]>();
  const [activeItem, setActiveItem] = useState<T>();
  const [contextPosition, setContextPosition] =
    useState<Record<"x" | "y", number>>();

  const contextMenuActions = itemActionComponent?.props.children;
  const isContextMenuVisible = Boolean(contextPosition);

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
        renderLayout={layout => (
          <>
            {elementData.map((child, i) => {
              const item = data[i];
              const isActive = activeID === item.id;
              const shouldShowContextMenu =
                isActive && isContextMenuVisible && Boolean(contextMenuActions);

              return (
                <div
                  // Set the active item whenever the element or any of its
                  // children are clicked
                  onClick={handleSetActiveItem(item)}
                  onMouseEnter={handleSetActiveItem(item)}
                  onMouseLeave={handleUnsetActiveItem}
                  onContextMenu={handleContextMenu}
                  className={classNames(styles.listItem, {
                    [styles.active]: isActive && isContextMenuVisible,
                  })}
                  key={item.id}
                >
                  <DataListItemInternal item={data[i]}>
                    {layout.props.children(child)}
                  </DataListItemInternal>

                  <AnimatePresence>
                    {activeID === item.id && !hasInLayoutActions && (
                      <InternalDataListItemActions item={item} />
                    )}

                    <DataListActionsMenu
                      key={item.id}
                      visible={shouldShowContextMenu}
                      position={contextPosition || { x: 0, y: 0 }}
                      onRequestClose={() => setContextPosition(undefined)}
                    >
                      {contextMenuActions &&
                        Children.map(contextMenuActions, action => (
                          <InternalDataListAction
                            key={item.id}
                            {...action.props}
                            item={item}
                          />
                        ))}
                    </DataListActionsMenu>
                  </AnimatePresence>
                </div>
              );
            })}
          </>
        )}
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
    if (isContextMenuVisible) return;
    setActiveID(undefined);
    setActiveItem(undefined);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (!contextMenuActions || isContextMenuVisible) return;

    event.preventDefault();
    setContextPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }
}
