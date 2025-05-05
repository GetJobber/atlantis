import React, { useState } from "react";
import styles from "./FormatFile.module.css";
import { FormatFileProps } from "./types";
import { useFormatFile } from "./useFormatFile";
import { useFormatFileStyles } from "./useFormatFileStyles";
import { Thumbnail } from "../Thumbnail";
import { Text } from "../Text";
import { ProgressBar } from "../ProgressBar";
import { Button } from "../Button";
import { ConfirmationModal } from "../ConfirmationModal";
import { FileUpload } from "../InputFile";

export function FormatFile({
  file,
  display = "expanded",
  displaySize = "base",
  onDelete,
  onClick,
}: FormatFileProps) {
  const { isComplete, fileSize } = useFormatFile({
    file,
    display,
    displaySize,
    onClick,
    onDelete,
  });
  const {
    wrapperClassNames,
    detailsClassNames,
    progressClassNames,
    thumbnailContainerClassNames,
  } = useFormatFileStyles({
    display,
    displaySize,
    isComplete,
    onClick,
    onDelete,
  });

  return (
    <FormatFile.Wrapper className={wrapperClassNames}>
      <FormatFile.Body
        type="button"
        className={detailsClassNames}
        onClick={isComplete ? onClick : undefined}
        tabIndex={0}
        ariaBusy={!isComplete}
        isComplete={isComplete}
      >
        <FormatFile.ThumbnailContainer className={thumbnailContainerClassNames}>
          <Thumbnail
            key={file.key}
            compact={display === "compact"}
            file={file}
            size={displaySize}
          />
          <FormatFile.ProgressContainer
            visible={!isComplete}
            className={progressClassNames}
          >
            <ProgressBar
              size="small"
              currentStep={file.progress * 100}
              totalSteps={100}
            />
          </FormatFile.ProgressContainer>
        </FormatFile.ThumbnailContainer>

        <FormatFile.Expanded
          visible={display === "expanded"}
          file={file}
          fileSize={fileSize}
        />
      </FormatFile.Body>
      <FormatFile.DeleteButton isComplete={isComplete} onDelete={onDelete} />
    </FormatFile.Wrapper>
  );
}

FormatFile.ProgressContainer = function FormatFileProgressContainer({
  visible,
  children,
  className,
}: {
  readonly visible: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  if (!visible) return null;

  return <div className={className}>{children}</div>;
};

FormatFile.ThumbnailContainer = function FormatFileThumbnailContainer({
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  return <div className={className}>{children}</div>;
};

FormatFile.Body = function FormatFileBody({
  children,
  className,
  type,
  onClick,
  tabIndex,
  ariaBusy,
  isComplete,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly type?: "button" | "submit" | "reset";
  readonly onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  >;
  readonly tabIndex?: number;
  readonly ariaBusy?: boolean;
  readonly isComplete: boolean;
}) {
  const FormatFileBodyTag = isComplete && onClick ? "button" : "div";

  return (
    <FormatFileBodyTag
      type={type}
      className={className}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-busy={ariaBusy}
    >
      {children}
    </FormatFileBodyTag>
  );
};

FormatFile.Expanded = function FormatFileExpanded({
  file,
  fileSize,
  visible,
}: {
  readonly file: FileUpload;
  readonly fileSize: string;
  readonly visible: boolean;
}) {
  if (!visible) return null;

  return (
    <div className={styles.contentBlock}>
      <Text size="base">{file.name}</Text>
      <Text size="small">{fileSize}</Text>
    </div>
  );
};

FormatFile.Wrapper = function FormatFileWrapper({
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  return <div className={className}>{children}</div>;
};

FormatFile.DeleteButton = function FormatFileDeleteButton({
  onDelete,
  isComplete,
  size = "base",
}: {
  readonly onDelete?: () => void;
  readonly isComplete: boolean;
  readonly size?: "base" | "large";
}) {
  const buttonSize = size === "base" ? "small" : "base";
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  return isComplete && onDelete ? (
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
  ) : null;
};
