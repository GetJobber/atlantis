import React, { Children, ReactElement, isValidElement } from "react";
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
    >
      {exposedActions.map(action => {
        if (!action.props.icon) return <></>;

        return (
          <Button
            key={action.props.label}
            icon={action.props.icon}
            ariaLabel={action.props.label}
            onClick={() => action.props.onClick?.(item)}
            type="secondary"
            variation="subtle"
          />
        );
      })}

      <DataListItemActionsOverflow actions={childrenArray} item={item} />
    </motion.div>
  );
}

function getExposedActions<T extends DataListObject>(
  childrenArray: ReactElement<DataListActionProps<T>>[],
) {
  const firstTwoChildren = childrenArray.slice(0, 2);

  return firstTwoChildren.reduce((result: typeof childrenArray, child, i) => {
    const hasIcon = Boolean(child.props.icon);

    const isFirstChild = i === 0;
    if (isFirstChild && hasIcon) {
      return [...result, child];
    }

    const isSecondChild = i === 1;
    const hasFirstChild = result.length === 1;
    if (isSecondChild && hasIcon && hasFirstChild) {
      return [...result, child];
    }

    return result;
  }, []);
}
