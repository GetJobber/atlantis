import React, { useState } from "react";
import filesize from "filesize";
import classNames from "classnames";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { FormatFileDeleteButton } from "./FormatFileDeleteButton";
import { ImageWithoutSource } from "./ImageWithoutSource";
import { Typography } from "../Typography";
import { ProgressBar } from "../ProgressBar";
import { FileUpload } from "../InputFile";

const progressBar = (file: FileUpload) => (
  <div className={styles.progress}>
    <ProgressBar
      size="small"
      currentStep={file.progress * 100}
      totalSteps={100}
    />
  </div>
);

interface FormatFileProps {
  /**
   * File upload details object. (See FileUpload type.)
   */
  readonly file: FileUpload;

  /**
   * To display as either a file row or thumbnail
   *
   * @default "expanded"
   */
  readonly display?: "expanded" | "compact";

  /**
   * The base dimensions of the thumbnail
   *
   * @default "default"
   */
  readonly displaySize?: "default" | "large";

  /**
   * Function to execute when format file is clicked
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
}

export function FormatFile({
  file,
  display = "expanded",
  displaySize = "default",
  onDelete,
  onClick,
}: FormatFileProps) {
  const [imageSource, setImageSource] = useState<string>();
  const isComplete = file.progress >= 1;

  const [showDeleteButton, setShowDeleteButton] = useState(
    isFileDisplay(display) ? true : false,
  );

  const iconName = getIconNameFromType(file.type);
  const fileSize = getHumanReadableFileSize(file.size);

  if (!imageSource && file.type.startsWith("image/") && file.src) {
    file.src().then(src => setImageSource(src));
  }

  const imageBlockStyle = imageSource
    ? { backgroundImage: `url(${imageSource})` }
    : {};

  return (
    <div
      onMouseEnter={() => {
        showDeleteButtonIfCompact(!isFileDisplay(display), setShowDeleteButton);
      }}
      onMouseLeave={() => {
        hideDeleteButtonIfCompact(!isFileDisplay(display), setShowDeleteButton);
      }}
      onFocus={() => {
        showDeleteButtonIfCompact(!isFileDisplay(display), setShowDeleteButton);
      }}
      onBlur={() => {
        hideDeleteButtonIfCompact(!isFileDisplay(display), setShowDeleteButton);
      }}
      className={formatFileClassnames(display, displaySize)}
    >
      <div
        className={imageBlockClassnames(
          isComplete,
          isInteractable(display, isComplete, onClick, onDelete),
          !isFileDisplay(display),
        )}
        style={
          isFileDisplay(display)
            ? { ...imageBlockStyle }
            : {
                ...imageBlockStyle,
                width: "inherit",
                height: "inherit",
              }
        }
        tabIndex={
          isInteractable(display, isComplete, onClick, onDelete) ? 0 : undefined
        }
        data-testid="imageBlock"
        onClick={event => {
          onClick?.(event);
          event.currentTarget.focus();
        }}
      >
        {!imageSource && (
          <ImageWithoutSource
            displayIsExpanded={isFileDisplay(display)}
            displaySize={displaySize}
            iconName={iconName}
            filename={file.name}
            isComplete={isComplete}
          />
        )}
        {!isComplete && <>{progressBar(file)}</>}
      </div>
      {isFileDisplay(display) && (
        <div className={styles.contentBlock}>
          <Typography element="span">{file.name}</Typography>
          <Typography element="p" size="small" textColor="greyBlueDark">
            {fileSize}
          </Typography>
        </div>
      )}
      {isComplete && onDelete && showDeleteButton && (
        <>
          <FormatFileDeleteButton
            deleteButtonStyle={
              isFileDisplay(display)
                ? styles.deleteButtonExpanded
                : styles.deleteButtonCompact
            }
            size={isFileDisplay(display) ? "large" : displaySize}
            onDelete={onDelete}
          />
        </>
      )}
    </div>
  );
}

function isInteractable(
  display: "expanded" | "compact",
  isComplete: boolean,
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  onDelete?: () => void,
) {
  if (!isComplete) {
    return false;
  }

  return (
    (!isFileDisplay(display) && onClick !== undefined) ||
    (!isFileDisplay(display) && onDelete !== undefined) ||
    (isFileDisplay(display) && onClick !== undefined)
  );
}

function hideDeleteButtonIfCompact(
  isCompact: boolean,
  setShowDeleteButton: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (isCompact) {
    setShowDeleteButton(false);
  }
}

function showDeleteButtonIfCompact(
  isCompact: boolean,
  setShowDeleteButton: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (isCompact) {
    setShowDeleteButton(true);
  }
}

function isFileDisplay(display: "expanded" | "compact") {
  return display === "expanded";
}

function formatFileClassnames(
  display: "expanded" | "compact",
  displaySize: "default" | "large",
) {
  const classnamesForFormatFile = [];

  if (display === "expanded") {
    classnamesForFormatFile.push(styles.expanded);
  } else if (display === "compact") {
    classnamesForFormatFile.push(styles.thumbnail);
    if (displaySize === "default") {
      classnamesForFormatFile.push(styles.thumbnailDefault);
    } else {
      classnamesForFormatFile.push(styles.thumbnailLarge);
    }
  }

  return classNames(classnamesForFormatFile);
}

function imageBlockClassnames(
  isComplete: boolean,
  hoverable: boolean,
  isCompact: boolean,
) {
  const imageBlockClassnamesArray = [styles.imageBlock];
  if (!isComplete) {
    imageBlockClassnamesArray.push(styles.imageBlockOverlay);
  }
  if (isComplete && hoverable) {
    imageBlockClassnamesArray.push(styles.imageBlockHoverable);
  }
  if (isCompact) {
    imageBlockClassnamesArray.push(styles.imageBlockCompact);
    imageBlockClassnamesArray.push(styles.imageBlockOverlayCompact);
  }

  return classNames(imageBlockClassnamesArray);
}

function getHumanReadableFileSize(sizeInBytes: number): string {
  return filesize(sizeInBytes);
}

function getIconNameFromType(mimeType: string): IconNames {
  if (mimeType.startsWith("image/")) return "camera";
  if (mimeType.startsWith("video/")) return "video";

  switch (mimeType) {
    case "application/pdf":
      return "pdf";
    case "application/vnd.ms-excel":
      return "excel";
    default:
      return "file";
  }
}
