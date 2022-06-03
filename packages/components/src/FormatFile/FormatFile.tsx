import React, { useState } from "react";
import filesize from "filesize";
import classNames from "classnames";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { FormatFileDeleteButton } from "./FormatFileDeleteButton";
import { DisplaySize, sizeToDimensions } from "./sizeToDimensions";
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
  readonly displaySize?: DisplaySize;

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

  const thumbnailDimensions = sizeToDimensions[displaySize];
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
      className={isFileDisplay(display) ? styles.formatFile : styles.thumbnail}
      style={
        isFileDisplay(display)
          ? {}
          : {
              width: thumbnailDimensions.width,
              height: thumbnailDimensions.height,
            }
      }
    >
      <div
        className={imageBlockClassnames(
          isComplete,
          onClick !== undefined || onDelete !== undefined,
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
        tabIndex={0}
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

function imageBlockClassnames(isComplete: boolean, hoverable: boolean) {
  const imageBlockClassnamesArray = [styles.imageBlock];
  if (!isComplete) {
    imageBlockClassnamesArray.push(styles.imageBlockOverlay);
  }
  if (isComplete && hoverable) {
    imageBlockClassnamesArray.push(styles.imageBlockHoverable);
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
