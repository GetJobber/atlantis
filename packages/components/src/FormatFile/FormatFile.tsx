import React, { useState } from "react";
import styles from "./FormatFile.module.css";
import { FormatFileProps } from "./types";
import { useFormatFileStyles } from "./useFormatFileStyles";
import { useFormatFile } from "./useFormatFile";
import { Thumbnail } from "../Thumbnail";
import { Text } from "../Text";
import { ProgressBar } from "../ProgressBar";
import { Button } from "../Button";
import { ConfirmationModal } from "../ConfirmationModal";

export function FormatFile({
  file,
  display = "expanded",
  displaySize = "base",
  onDelete,
  onClick,
}: FormatFileProps) {
  const { isComplete, DetailsContainer, fileSize } = useFormatFile({
    onClick,
    file,
  });

  const { wrapperClassNames, detailsClassNames, thumbnailContainerClassNames } =
    useFormatFileStyles({
      display,
      displaySize,
      onClick: !!onClick,
      onDelete: !!onDelete,
      isComplete,
    });

  return (
    <div className={wrapperClassNames}>
      <DetailsContainer
        type="button"
        className={detailsClassNames}
        onClick={isComplete ? onClick : undefined}
        tabIndex={0}
        aria-busy={!isComplete}
      >
        <div className={thumbnailContainerClassNames}>
          <Thumbnail
            key={file.key}
            compact={display === "compact"}
            file={file}
            size={displaySize}
          />
          <FormatFile.Progress file={file} isComplete={isComplete} />
        </div>
        <FormatFile.Expanded
          file={file}
          fileSize={fileSize}
          display={display}
        />
      </DetailsContainer>
      <FormatFile.DeleteButton
        isComplete={isComplete}
        onDelete={onDelete}
        displaySize={displaySize}
      />
    </div>
  );
}

FormatFile.Progress = function Progress({
  file,
  isComplete,
}: Pick<FormatFileProps, "file"> & { readonly isComplete: boolean }) {
  if (isComplete) {
    return null;
  }

  return (
    <div className={styles.progress}>
      <ProgressBar
        size="small"
        currentStep={file.progress * 100}
        totalSteps={100}
      />
    </div>
  );
};

FormatFile.Expanded = function Expanded({
  display,
  file,
  fileSize,
}: Pick<FormatFileProps, "display" | "file"> & { readonly fileSize: string }) {
  if (display !== "expanded") {
    return null;
  }

  return (
    <div className={styles.contentBlock}>
      <Text size="base">{file.name}</Text>
      <Text size="small">{fileSize}</Text>
    </div>
  );
};

FormatFile.DeleteButton = function DeleteButton({
  isComplete,
  displaySize,
  onDelete,
}: Pick<FormatFileProps, "onDelete" | "displaySize"> & {
  readonly isComplete: boolean;
}) {
  if (!isComplete || !onDelete) {
    return null;
  }
  const buttonSize = displaySize === "base" ? "small" : "base";
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  return (
    <div className={styles.deleteButton}>
      <Button
        onClick={() => setDeleteConfirmationOpen(true)}
        variation="destructive"
        type="tertiary"
        icon="remove"
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
};
