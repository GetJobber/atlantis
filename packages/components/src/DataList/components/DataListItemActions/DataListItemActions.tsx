import React, {
  Children,
  MouseEvent,
  ReactElement,
  isValidElement,
} from "react";
import { Variants, motion } from "framer-motion";
import styles from "./DataListItemActions.css";
import { DataListItemActionsOverflow } from "./DataListItemActionsOverflow";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListActionProps,
  DataListItemActionsProps,
  DataListObject,
} from "../../DataList.types";
import { Button } from "../../../Button";
import {
  TRANSITION_DELAY_IN_SECONDS,
  TRANSITION_DURATION_IN_SECONDS,
} from "../../DataList.const";
import { Tooltip } from "../../../Tooltip";
import { getExposedActions } from "../../DataList.utils";

// This component is meant to capture the props of the DataList.ItemActions
export function DataListItemActions<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListItemActionsProps<T>,
) {
  return null;
}

interface InternalDataListItemActionsProps<T extends DataListObject> {
  readonly item: T;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function InternalDataListItemActions<T extends DataListObject>({
  item,
}: InternalDataListItemActionsProps<T>) {
  const { itemActionComponent } = useDataListContext();
  if (!itemActionComponent) return null;

  const { children } = itemActionComponent.props;
  const childrenArray =
    Children.toArray(children).filter<ReactElement<DataListActionProps<T>>>(
      isValidElement,
    );
  const exposedActions = getExposedActions(childrenArray);
  childrenArray.splice(0, exposedActions.length);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: TRANSITION_DURATION_IN_SECONDS,
        delay: TRANSITION_DELAY_IN_SECONDS,
      }}
      className={styles.menu}
      onContextMenu={handleContextMenu}
    >
      {exposedActions.map(({ props }) => {
        if (!props.icon) return null;

        return (
          <Tooltip key={props.label} message={props.label}>
            <Button
              icon={props.icon}
              ariaLabel={props.label}
              onClick={() => props.onClick?.(item)}
              type="secondary"
              variation="subtle"
            />
          </Tooltip>
        );
      })}

      {Boolean(childrenArray.length) && (
        <DataListItemActionsOverflow actions={childrenArray} />
      )}
    </motion.div>
  );
}

function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}
