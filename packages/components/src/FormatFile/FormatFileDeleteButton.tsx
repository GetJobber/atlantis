import React, { useState } from "react";
import { Button } from "../Button";
import { ConfirmationModal } from "../ConfirmationModal";

interface DeleteButtonProps {
  deleteButtonStyle: string;
  size?: "default" | "large";
  onDelete?: () => void;
}

export function FormatFileDeleteButton({
  deleteButtonStyle,
  size,
  onDelete,
}: DeleteButtonProps) {
  const buttonSize = size === "default" ? "small" : "base";
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  return (
    <>
      <div className={deleteButtonStyle}>
        <Button
          onClick={() => setDeleteConfirmationOpen(true)}
          variation="destructive"
          type="tertiary"
          icon="trash"
          ariaLabel="Delete Thumbnail"
          size={buttonSize}
        />
      </div>
      <ConfirmationModal
        title="Confirm Deletion"
        message={`Are you sure you want to delete this file?`}
        confirmLabel="Delete"
        variation="destructive"
        open={deleteConfirmationOpen}
        onConfirm={() => onDelete?.()}
        onRequestClose={() => setDeleteConfirmationOpen(false)}
      />
    </>
  );
}
