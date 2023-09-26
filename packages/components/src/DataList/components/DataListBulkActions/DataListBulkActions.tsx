import React, { Children, ReactElement, isValidElement } from "react";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
import styles from "./DataListBulkActions.css";
import { DataListBulkActionsProps } from "../../DataList.types";
import { useDataListContext } from "../../context/DataListContext";
import { DataListItemActionsOverflow } from "../DataListItemActions/DataListItemActionsOverflow";
import { getExposedActions } from "../../DataList.utils";

// This component is meant to capture the props of the DataList.BulkActions
export function DataListBulkActions(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListBulkActionsProps,
) {
  return null;
}

export function InternalDataListBulkActions() {
  const { bulkActionsComponent } = useDataListContext();
  if (!bulkActionsComponent) return null;

  const { children } = bulkActionsComponent.props;
  const childrenArray =
    Children.toArray(children).filter<ReactElement>(isValidElement);

  const exposedActions = getExposedActions(childrenArray);
  childrenArray.splice(0, exposedActions.length);

  return (
    <div style={{ position: "relative" }}>
      <div className={styles.bulkActionsContainer}>
        {exposedActions.map(({ props }) => {
          if (!props.icon) return null;

          return (
            <Tooltip key={props.label} message={props.label}>
              <Button
                icon={props.icon}
                ariaLabel={props.label}
                onClick={() => props.onClick?.()}
                type="secondary"
                variation="subtle"
              />
            </Tooltip>
          );
        })}

        <DataListItemActionsOverflow actions={childrenArray} />
      </div>
    </div>
  );
}
