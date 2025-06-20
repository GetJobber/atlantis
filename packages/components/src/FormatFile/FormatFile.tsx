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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

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
    deleteButtonContainerClassNames,
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
            isHidden={isComplete}
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
          isVisible={display === "expanded"}
          file={file}
          fileSize={fileSize}
        />
      </FormatFile.Body>
      <FormatFile.DeleteButtonContainer
        className={deleteButtonContainerClassNames}
        isHidden={!isComplete || onDelete === undefined}
      >
        <FormatFile.DeleteButton
          onDelete={() => {
            setDeleteConfirmationOpen(true);
          }}
        >
          <ConfirmationModal
            title="Confirm Deletion"
            message={`Are you sure you want to delete this file?`}
            confirmLabel="Delete"
            variation="destructive"
            open={deleteConfirmationOpen}
            onConfirm={() => onDelete?.()}
            onRequestClose={() => setDeleteConfirmationOpen(false)}
          />
        </FormatFile.DeleteButton>
      </FormatFile.DeleteButtonContainer>
    </FormatFile.Wrapper>
  );
}

FormatFile.DeleteButtonContainer = function FormatFileDeleteButtonContainer({
  children,
  className,
  isHidden,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly isHidden?: boolean;
}) {
  if (isHidden) return null;

  return <div className={className}>{children}</div>;
};

FormatFile.ProgressContainer = function FormatFileProgressContainer({
  isHidden,
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly isHidden?: boolean;
}) {
  if (isHidden) return null;

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
  isVisible,
}: {
  readonly file: FileUpload;
  readonly fileSize: string;
  readonly isVisible: boolean;
}) {
  if (!isVisible) return null;

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
  size = "base",
  children,
}: {
  readonly onDelete?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  readonly size?: "base" | "large";
  readonly children?: React.ReactNode;
}) {
  const buttonSize = size === "base" ? "small" : "base";

  return (
    <>
      <Button
        UNSAFE_className={{
          container: size === "base" ? styles.customDeleteButton : undefined,
        }}
        onClick={onDelete}
        variation="destructive"
        type="tertiary"
        icon="trash"
        ariaLabel="Delete File"
        size={buttonSize}
      />
      {children}
    </>
  );
};
