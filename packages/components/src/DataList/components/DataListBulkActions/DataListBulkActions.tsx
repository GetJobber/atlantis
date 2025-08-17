import React from "react";
import styles from "./DataListBulkActions.module.css";
import { BULK_ACTIONS_CONTAINER_TEST_ID } from "./DataListBulkActions.const";
import type { DataListBulkActionsProps } from "../../DataList.types";
import { useDataListContext } from "../../context/DataListContext";
import { DataListActions } from "../DataListActions";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

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

  const { sm } = useResponsiveSizing();

  // Collapse all actions under "More actions" when breakpoint is smaller than sm
  const itemsToExpose = sm ? 3 : 0;

  return (
    <div
      data-testid={BULK_ACTIONS_CONTAINER_TEST_ID}
      className={styles.bulkActions}
    >
      <DataListActions itemsToExpose={itemsToExpose}>
        {children}
      </DataListActions>
    </div>
  );
}
