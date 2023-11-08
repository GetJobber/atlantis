import React, { MouseEvent, ReactElement } from "react";
import { Variants, motion } from "framer-motion";
import styles from "./DataListItemActions.css";
import {
  DataListActionProps,
  DataListItemActionsProps,
  DataListObject,
} from "../../DataList.types";
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

interface InternalDataListItemActionsProps<T extends DataListObject> {
  readonly actions: ReactElement<DataListActionProps<T>>[];
}

export function InternalDataListItemActions<T extends DataListObject>({
  actions,
}: InternalDataListItemActionsProps<T>) {
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
      <DataListActions>{actions}</DataListActions>
    </motion.div>
  );
}

function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}
