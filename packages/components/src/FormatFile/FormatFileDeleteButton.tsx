import React, { useState } from "react";
import styles from "./FormatFile.module.css";
import { Button } from "../Button";
import { ConfirmationModal } from "../ConfirmationModal";

interface DeleteButtonProps {
  readonly size?: "base" | "large";
  readonly onDelete?: () => void;
  readonly quickDelete?: boolean;
}

export function FormatFileDeleteButton({
  size,
  onDelete,
  quickDelete,
}: DeleteButtonProps) {
  const buttonSize = size === "base" ? "small" : "base";
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const determineIfQuickDelete = () => {
    if (!quickDelete) {
      setDeleteConfirmationOpen(!deleteConfirmationOpen);
    } else {
      onDelete?.();
    }
  };

  return (
    <div className={styles.deleteButton}>
      <Button
        onClick={determineIfQuickDelete}
        variation="destructive"
        type="tertiary"
        icon={quickDelete ? "remove" : "trash"}
        ariaLabel="Delete File"
        size={buttonSize}
      />
      <ConfirmationModal
        title="Confirm Deletion"
        message={`Are you sure you want to delete this file?`}
        confirmLabel="Delete"
        variation="destructive"
        open={deleteConfirmationOpen}
        onConfirm={() => onDelete?.()}
        onRequestClose={() => setDeleteConfirmationOpen(false)}
      />
    </div>
  );
}
