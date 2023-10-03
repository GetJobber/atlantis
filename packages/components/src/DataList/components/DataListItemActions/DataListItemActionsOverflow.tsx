import React, { MouseEvent, ReactElement, useState } from "react";
import { Button } from "../../../Button";
import { Tooltip } from "../../../Tooltip";
import { DataListActionProps, DataListObject } from "../../DataList.types";
import { DataListActionsMenu } from "../DataListActionsMenu";

interface DataListItemActionsOverflowProps<T extends DataListObject> {
  readonly actions: ReactElement<DataListActionProps<T>>[];
}

export function DataListItemActionsOverflow<T extends DataListObject>({
  actions,
}: DataListItemActionsOverflowProps<T>) {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Tooltip message="More actions">
        <Button
          icon="more"
          ariaLabel="More actions"
          type="secondary"
          variation="subtle"
          onClick={handleMoreClick}
        />
      </Tooltip>

      {actions && (
        <DataListActionsMenu
          visible={showMenu}
          position={menuPosition}
          onRequestClose={handleClose}
        >
          {actions}
        </DataListActionsMenu>
      )}
    </>
  );

  function handleMoreClick(event: MouseEvent<HTMLButtonElement>): void {
    setShowMenu(true);

    const rect = event.currentTarget.getBoundingClientRect();
    const posX = rect.x;
    const posY = rect.y + rect.height;

    setMenuPosition({ x: posX, y: posY });
  }

  function handleClose() {
    setShowMenu(false);
  }
}
