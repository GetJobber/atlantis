import React, { Children, MouseEvent, ReactElement, useState } from "react";
import { AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { useDataListLayoutContext } from "@jobber/components/DataList/context/DataListLayoutContext";
import {
  DataListItemType,
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { InternalDataListItemActions } from "@jobber/components/DataList/components/DataListItemActions";
import { DataListActionsMenu } from "@jobber/components/DataList/components/DataListActionsMenu";
import { InternalDataListAction } from "@jobber/components/DataList/components/DataListAction";
import { DataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import styles from "@jobber/components/DataList/DataList.css";
import { DataListItemInternal } from "./DataListItemInternal";

interface DataListItem<T extends DataListObject> {
  readonly item: DataListItemType<T[]>;
  readonly index: number;
  readonly layout: ReactElement<DataListLayoutProps<T>>;
}

export function DataListItem<T extends DataListObject>({
  item,
  index,
  layout,
}: DataListItem<T>) {
  const { data, itemActionComponent } = useDataListContext();
  const { hasInLayoutActions } = useDataListLayoutContext();
  const [showMenu, setShowMenu] = useState(false);
  const [contextPosition, setContextPosition] =
    useState<Record<"x" | "y", number>>();

  const rawItem = data[index];

  const contextMenuActions = itemActionComponent?.props.children;
  const isContextMenuVisible = Boolean(contextPosition);
  const shouldShowContextMenu =
    showMenu && isContextMenuVisible && Boolean(contextMenuActions);

  return (
    <DataListLayoutActionsContext.Provider value={{ activeItem: rawItem }}>
      <div
        onMouseEnter={handleShowMenu}
        onMouseLeave={handleHideMenu}
        onContextMenu={handleContextMenu}
        className={classNames(styles.listItem, {
          [styles.active]: showMenu && isContextMenuVisible,
        })}
        key={rawItem.id}
      >
        <DataListItemInternal item={rawItem}>
          {layout.props.children(item)}
        </DataListItemInternal>

        <AnimatePresence>
          {showMenu && !hasInLayoutActions && (
            <InternalDataListItemActions item={rawItem} />
          )}

          <DataListActionsMenu
            key={rawItem.id}
            visible={shouldShowContextMenu}
            position={contextPosition || { x: 0, y: 0 }}
            onRequestClose={() => setContextPosition(undefined)}
          >
            {contextMenuActions &&
              Children.map(contextMenuActions, action => (
                <InternalDataListAction
                  key={rawItem.id}
                  {...action.props}
                  item={rawItem}
                />
              ))}
          </DataListActionsMenu>
        </AnimatePresence>
      </div>
    </DataListLayoutActionsContext.Provider>
  );

  function handleShowMenu() {
    setShowMenu(true);
  }

  function handleHideMenu() {
    setShowMenu(false);
  }

  function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
    if (!contextMenuActions || isContextMenuVisible) return;

    event.preventDefault();
    setContextPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }
}
