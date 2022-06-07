import React from "react";
import { Button } from "../Button";

interface DeleteButtonProps {
  deleteButtonStyle: string;
  size?: "default" | "large";
  setDeleteConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormatFileDeleteButton({
  deleteButtonStyle,
  size,
  setDeleteConfirmationOpen,
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
    </>
  );
}
