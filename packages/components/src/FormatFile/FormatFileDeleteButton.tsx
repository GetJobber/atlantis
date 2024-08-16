import React, { useState } from "react";
import styles from "./FormatFile.css";
import { Button } from "../Button";
import { ConfirmationModal } from "../ConfirmationModal";

interface DeleteButtonProps {
  readonly size?: "base" | "large";
  readonly onDelete?: () => void;
}

export function FormatFileDeleteButton({ size, onDelete }: DeleteButtonProps) {
  const buttonSize = size === "base" ? "small" : "base";
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  return (
    <div className={styles.deleteButton}>
      <Button
        onClick={() => setDeleteConfirmationOpen(true)}
        variation="destructive"
        type="tertiary"
        icon="trash"
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
