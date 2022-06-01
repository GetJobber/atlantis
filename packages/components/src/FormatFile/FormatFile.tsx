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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const iconName = getIconNameFromType(file.type);
  const fileSize = getHumanReadableFileSize(file.size);

  if (!imageSource && file.type.startsWith("image/") && file.src) {
    file.src().then(src => setImageSource(src));
  }

  const style = imageSource ? { backgroundImage: `url(${imageSource})` } : {};
  const imageBlockStyle = isComplete
    ? styles.imageBlock
    : classNames(styles.imageBlock, styles.imageBlockOverlay);

  const isFileDisplay = display === "expanded";

  return (
    <div
      className={
        isFileDisplay
          ? styles.formatFile
          : thumbnailParentClassnames(imageSource, displaySize)
      }
      style={
        isFileDisplay
          ? {}
          : {
              width: thumbnailDimensions.width,
              height: thumbnailDimensions.height,
            }
      }
    >
      <div
        className={imageBlockStyle}
        style={
          isFileDisplay
            ? { ...style }
            : {
                ...style,
                width: "inherit",
                height: "inherit",
              }
        }
        tabIndex={0}
        data-testid="imageBlock"
        onClick={onClick}
      >
        {!imageSource && (
          <ImageWithoutSource
            displayIsExpanded={isFileDisplay}
            displaySize={displaySize}
            iconName={iconName}
            filename={file.name}
          />
        )}
        {!isComplete && <>{progressBar(file)}</>}
      </div>
      {isFileDisplay && (
        <div className={styles.contentBlock}>
          <Typography element="span">{file.name}</Typography>
          <Typography element="p" size="small" textColor="greyBlueDark">
            {fileSize}
          </Typography>
        </div>
      )}
      {isComplete && onDelete && (
        <>
          <FormatFileDeleteButton
            deleteButtonStyle={
              isFileDisplay ? styles.actionBlock : styles.deleteButton
            }
            deleteConfirmationOpen={deleteConfirmationOpen}
            size={isFileDisplay ? "large" : displaySize}
            setDeleteConfirmationOpen={setDeleteConfirmationOpen}
            onDelete={onDelete}
          />
        </>
      )}
    </div>
  );
}

function thumbnailParentClassnames(
  imageSource: string | undefined,
  displaySize: DisplaySize,
) {
  if (imageSource) {
    return styles.thumbnail;
  } else {
    if (displaySize === "large") {
      return classNames(
        styles.thumbnail,
        styles.thumbnailNonImage,
        styles.thumbnailLarge,
      );
    } else {
      return classNames(styles.thumbnail, styles.thumbnailNonImage);
    }
  }
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
