import type { ReactElement } from "react";
import React, { Children, isValidElement } from "react";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
import type {
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
      {exposedActions.map(({ props: actionProps }) => {
        const props = actionProps as DataListActionProps<T>;
        // @ts-expect-error - TODO: fix activeItem might be undefined
        const isVisible = props.visible ? props.visible(activeItem) : true;
        const hasIconOrAlwaysVisible = props.icon || props.alwaysVisible;

        if (!isVisible || !hasIconOrAlwaysVisible) {
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
        if (props.alwaysVisible) {
          return (
            <Button
              ariaLabel={actionLabel}
              // @ts-expect-error - TODO: fix props.label might be a function
              key={props.label}
              icon={props.icon}
              label={actionLabel}
              onClick={() => {
                // @ts-expect-error - TODO: fix activeItem might be undefined
                props.onClick?.(activeItem);
              }}
              type="secondary"
              variation="subtle"
            />
          );
        }

        return (
          // @ts-expect-error - TODO: fix actionLabel might be undefined
          <Tooltip key={actionLabel} message={actionLabel}>
            {/* @ts-expect-error - TODO: fix Button requires children? */}
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
