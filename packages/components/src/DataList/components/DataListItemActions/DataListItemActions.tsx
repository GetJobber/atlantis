import React, { MouseEvent } from "react";
import { Variants, motion } from "framer-motion";
import styles from "./DataListItemActions.css";
import { useDataListContext } from "../../context/DataListContext";
import { DataListItemActionsProps, DataListObject } from "../../DataList.types";
import {
  TRANSITION_DELAY_IN_SECONDS,
  TRANSITION_DURATION_IN_SECONDS,
} from "../../DataList.const";
import { DataListActions } from "../DataListActions";

// This component is meant to capture the props of the DataList.ItemActions
export function DataListItemActions<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListItemActionsProps<T>,
) {
  return null;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function InternalDataListItemActions() {
  const { itemActionComponent } = useDataListContext();
  if (!itemActionComponent) return null;

  const { children } = itemActionComponent.props;

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
      <DataListActions>{children}</DataListActions>
    </motion.div>
  );
}

function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}
