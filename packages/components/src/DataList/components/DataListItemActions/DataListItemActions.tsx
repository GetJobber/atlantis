import React, {
  Children,
  MouseEvent,
  ReactElement,
  isValidElement,
  useState,
} from "react";
import { Variants, motion } from "framer-motion";
import { tokens } from "@jobber/design";
import styles from "./DataListItemActions.css";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListActionProps,
  DataListItemActionsProps,
  DataListObject,
} from "../../DataList.types";
import { Button } from "../../../Button";
import { DataListActionsMenu } from "../DataListActionsMenu";
import { InternalDataListAction } from "../DataListAction";

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
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  if (!itemActionComponent) return null;

  const { children } = itemActionComponent.props;
  const childrenArray =
    Children.toArray(children).filter<ReactElement<DataListActionProps<T>>>(
      isValidElement,
    );
  const exposedActions = getExposedActions(childrenArray);
  childrenArray.splice(0, exposedActions.length);
  const hasIconOffset = childrenArray.some(
    child => child.props.icon !== undefined,
  );

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: tokens["timing-base"] / 1000,
        delay: tokens["timing-quick"] / 1000,
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

      <Button
        icon="more"
        ariaLabel="More actions"
        type="secondary"
        variation="subtle"
        onClick={handleMoreClick}
      />

      <DataListActionsMenu
        visible={showMenu}
        position={menuPosition}
        onRequestClose={() => setShowMenu(false)}
      >
        {childrenArray.map(action => {
          return (
            <InternalDataListAction
              key={action.props.label}
              {...action.props}
              withIconOffset={hasIconOffset}
              item={item}
            />
          );
        })}
      </DataListActionsMenu>
    </motion.div>
  );

  function handleMoreClick(event: MouseEvent<HTMLButtonElement>): void {
    setShowMenu(true);

    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.x + rect.width, y: rect.y + rect.height });
  }
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
