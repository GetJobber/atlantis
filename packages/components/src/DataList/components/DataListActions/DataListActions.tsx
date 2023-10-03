import React, { Children, ReactElement, isValidElement } from "react";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
import { DataListOverflowFade } from "../DataListOverflowFade";
import {
  DataListActionProps,
  DataListActionsProps,
  DataListObject,
} from "../../DataList.types";
import { getExposedActions } from "../../DataList.utils";
import { useDataListLayoutActionsContext } from "../DataListLayoutActions/DataListLayoutContext";
import { DataListItemActionsOverflow } from "../DataListItemActionsOverflow";

export function DataListActions<T extends DataListObject>({
  children,
  itemsToExpose = 2,
}: DataListActionsProps<T>) {
  const { activeItem } = useDataListLayoutActionsContext<T>();

  const childrenArray =
    Children.toArray(children).filter<ReactElement<DataListActionProps<T>>>(
      isValidElement,
    );
  const exposedActions = getExposedActions(childrenArray, itemsToExpose);
  childrenArray.splice(0, exposedActions.length);

  return (
    <DataListOverflowFade>
      {exposedActions.map(({ props }) => {
        if (!props.icon) return null;

        return (
          <Tooltip key={props.label} message={props.label}>
            <Button
              icon={props.icon}
              ariaLabel={props.label}
              onClick={() => {
                if (activeItem) {
                  props.onClick?.(activeItem);
                } else {
                  (props.onClick as () => void)?.();
                }
              }}
              type="secondary"
              variation="subtle"
            />
          </Tooltip>
        );
      })}

      <DataListItemActionsOverflow actions={childrenArray} />
    </DataListOverflowFade>
  );
}
