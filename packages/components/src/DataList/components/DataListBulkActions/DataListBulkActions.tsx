import React from "react";
import styles from "./DataListBulkActions.css";
import { DataListBulkActionsProps } from "../../DataList.types";
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
    <div className={styles.bulkActions}>
      <DataListActions itemsToExpose={itemsToExpose}>
        {children}
      </DataListActions>
    </div>
  );
}
