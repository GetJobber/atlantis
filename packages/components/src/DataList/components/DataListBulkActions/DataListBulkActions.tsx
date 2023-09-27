import React, { Children, ReactElement, isValidElement } from "react";
import classNames from "classnames";
import { useInView } from "@jobber/hooks/useInView";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
import styles from "./DataListBulkActions.css";
import { BULK_ACTIONS_CONTAINER_TEST_ID } from "./DataListBulkActions.const";
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

  const exposedActions = getExposedActions(childrenArray, 3);
  childrenArray.splice(0, exposedActions.length);

  const [leftRef, isLeftVisible] = useInView<HTMLSpanElement>();
  const [rightRef, isRightVisible] = useInView<HTMLSpanElement>();

  return (
    <div
      data-testid={BULK_ACTIONS_CONTAINER_TEST_ID}
      className={classNames(styles.filters, {
        [styles.overflowLeft]: !isLeftVisible,
        [styles.overflowRight]: !isRightVisible,
      })}
    >
      <div className={styles.bulkActionsContainer}>
        <span ref={leftRef} className={styles.overflowTrigger} />

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

        <span ref={rightRef} className={styles.overflowTrigger} />
      </div>
    </div>
  );
}
