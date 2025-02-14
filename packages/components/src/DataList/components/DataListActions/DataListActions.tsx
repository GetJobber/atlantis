import React, { Children, ReactElement, isValidElement } from "react";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
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
    <>
      {exposedActions.map(({ props }) => {
        const shouldHide =
          (props.visible && !props.visible(activeItem)) ||
          !(props.icon || props.alwaysVisible);

        if (shouldHide) {
          return null;
        }

        function getActionLabel() {
          if (typeof props.label === "string") {
            return props.label;
          }

          if (activeItem) {
            return props.label(activeItem);
          }
        }

        const actionLabel = getActionLabel();

        // If the action is always visible, we don't want a tooltip.

        if (props.alwaysVisible !== undefined && props.alwaysVisible) {
          return (
            <Button
              ariaLabel={actionLabel}
              key={props.label}
              icon={props.icon}
              label={actionLabel}
              onClick={() => {
                props.onClick?.(activeItem);
              }}
              type="secondary"
              variation="subtle"
            />
          );
        }

        return (
          <Tooltip key={actionLabel} message={actionLabel}>
            <Button
              icon={props.icon}
              ariaLabel={actionLabel}
              onClick={() => {
                if (activeItem) {
                  props.onClick?.(activeItem);
                } else {
                  (props.onClick as () => void)?.();
                }
              }}
              type="tertiary"
              variation="subtle"
            />
          </Tooltip>
        );
      })}

      <DataListItemActionsOverflow actions={childrenArray} />
    </>
  );
}
