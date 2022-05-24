import React from "react";
import { sizeToDimensions } from "./sizeToDimensions";
import { Button } from "../Button";
import { ConfirmationModal } from "../ConfirmationModal";

interface DeleteButtonProps {
  deleteButtonStyle: string;
  deleteConfirmationOpen: boolean;
  setDeleteConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: keyof typeof sizeToDimensions;
  onDelete?: () => void;
}

export function FormatFileDeleteButton({
  deleteButtonStyle,
  deleteConfirmationOpen,
  size,
  setDeleteConfirmationOpen,
  onDelete,
}: DeleteButtonProps) {
  const buttonSize = size === "default" ? "small" : "base";
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
        message={`Are you sure you want to delete this thumbnail?`}
        confirmLabel="Yes"
        open={deleteConfirmationOpen}
        onConfirm={() => onDelete?.()}
        onRequestClose={() => setDeleteConfirmationOpen(false)}
      />
    </>
  );
}
