import React, { MouseEvent, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { useDataListLayoutContext } from "@jobber/components/DataList/context/DataListLayoutContext";
import {
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { InternalDataListItemActions } from "@jobber/components/DataList/components/DataListItemActions";
import { DataListActionsMenu } from "@jobber/components/DataList/components/DataListActionsMenu";
import { DataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import { generateListItemElement } from "@jobber/components/DataList/DataList.utils";
import { DataListItemInternal } from "./DataListItemInternal";
import { DataListItemClickable } from "./components/DataListItemClickable";
import styles from "../../DataList.css";
import { useGetItemActions } from "../../hooks/useGetItemActions";
import { useDataListContext } from "../../context/DataListContext";

interface DataListItem<T extends DataListObject> {
  readonly item: T;
  readonly index: number;
  readonly layout: DataListLayoutProps<T>["children"];
}

// eslint-disable-next-line max-statements
export function DataListItem<T extends DataListObject>({
  item,
  layout,
}: DataListItem<T>) {
  const { hasInLayoutActions } = useDataListLayoutContext();
  const { selected } = useDataListContext();
  const [showMenu, setShowMenu] = useState(false);
  const [contextPosition, setContextPosition] =
    useState<Record<"x" | "y", number>>();

  const generatedItem = useMemo(() => generateListItemElement(item), [item]);

  const { actions, hasActions } = useGetItemActions<T>(item);
  const isContextMenuVisible = Boolean(contextPosition);
  const isMultiselectModeActive =
    Array.isArray(selected) && selected.length > 0;
  const isSingleRowSelected =
    isMultiselectModeActive && selected.length === 1 && selected[0] === item.id;

  const shouldShowContextMenu =
    showMenu &&
    isContextMenuVisible &&
    hasActions &&
    (!isMultiselectModeActive || hoveringSelectedBypass);

  const shouldShowHoverMenu =
    (!isMultiselectModeActive || hoveringSelectedBypass) &&
    showMenu &&
    hasActions &&
    !hasInLayoutActions &&
    !shouldShowContextMenu;

  return (
    <DataListLayoutActionsContext.Provider value={{ activeItem: item }}>
      <div
        onMouseEnter={handleShowMenu}
        onMouseLeave={handleHideMenu}
        onFocus={handleShowMenu}
        onBlur={handleHideMenu}
        onContextMenu={handleContextMenu}
        className={classNames(styles.listItem, {
          [styles.active]: showMenu && isContextMenuVisible,
        })}
        key={item.id}
      >
        <DataListItemInternal item={item}>
          <DataListItemClickable>{layout(generatedItem)}</DataListItemClickable>
        </DataListItemInternal>

        <AnimatePresence>
          {shouldShowHoverMenu && (
            <InternalDataListItemActions actions={actions} />
          )}

          <DataListActionsMenu
            key={item.id}
            visible={shouldShowContextMenu}
            position={contextPosition || { x: 0, y: 0 }}
            onRequestClose={() => setContextPosition(undefined)}
          >
            {actions}
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
    if (!hasActions || isContextMenuVisible || isMultiselectModeActive) return;

    event.preventDefault();
    setContextPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }
}
