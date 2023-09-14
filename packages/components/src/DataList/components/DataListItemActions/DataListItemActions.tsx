import React, { Children, ReactElement, isValidElement, useState } from "react";
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

// This component is meant to capture the props of the DataList.ItemActions
export function DataListItemActions<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListItemActionsProps<T>,
) {
  return null;
}

interface InternalDataListItemActionsProps<T extends DataListObject> {
  item: T;
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
    Children.toArray(children).filter<
      ReactElement<DataListActionProps<DataListObject>>
    >(isValidElement);
  const exposedActions = childrenArray.slice(0, 2);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: tokens["timing-base"] / 1000 }}
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
        onClick={event => {
          setShowMenu(true);

          const rect = event.currentTarget.getBoundingClientRect();
          setMenuPosition({ x: rect.x + rect.width, y: rect.y + rect.height });
        }}
      />

      <DataListActionsMenu
        visible={showMenu}
        position={menuPosition}
        onRequestClose={() => setShowMenu(false)}
      />
    </motion.div>
  );
}
