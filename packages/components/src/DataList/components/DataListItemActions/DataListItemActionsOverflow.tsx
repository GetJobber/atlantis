import React, { Children, MouseEvent, ReactElement, useState } from "react";
import { Button } from "../../../Button";
import { Tooltip } from "../../../Tooltip";
import {
  DataListActionProps,
  DataListObject,
  InternalDataListActionProps,
} from "../../DataList.types";
import { InternalDataListAction } from "../DataListAction";
import { DataListActionsMenu } from "../DataListActionsMenu";

interface DataListItemActionsOverflowProps<T extends DataListObject>
  extends Pick<InternalDataListActionProps<T>, "item"> {
  readonly actions: ReactElement<DataListActionProps<T>>[];
}

export function DataListItemActionsOverflow<T extends DataListObject>({
  item,
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

      <DataListActionsMenu
        visible={showMenu}
        position={menuPosition}
        onRequestClose={handleClose}
      >
        {Children.map(actions, action => (
          <InternalDataListAction {...action.props} item={item} />
        ))}
      </DataListActionsMenu>
    </>
  );

  function handleMoreClick(event: MouseEvent<HTMLButtonElement>): void {
    setShowMenu(true);

    const rect = event.currentTarget.getBoundingClientRect();
    const posX = rect.x + rect.width;
    const posY = rect.y + rect.height;

    setMenuPosition({ x: posX, y: posY });
  }

  function handleClose() {
    setShowMenu(false);
  }
}
