import React, { useState } from "react";
import filesize from "filesize";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { ProgressBar } from "../ProgressBar";
import { FileUpload } from "../InputFile";
import { ConfirmationModal } from "../ConfirmationModal";

const sizeToDimensions = {
  default: {
    width: 56,
    height: 56,
  },
  large: {
    width: 168,
    height: 168,
  },
};

interface FormatFileProps {
  /**
   * File upload details object. (See FileUpload type.)
   */
  readonly file: FileUpload;

  /**
   * TODO: change me
   *
   * @default "file"
   */
  readonly display?: "file" | "thumbnail";

  /**
   * TODO: change me
   *
   * @default "default"
   */
  readonly displaySize?: keyof typeof sizeToDimensions;

  /**
   * Click handler.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
}

export function FormatFile({
  file,
  display = "file",
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

  return (
    <>
      {display === "file" && (
        <div className={styles.formatFile}>
          <div
            className={styles.imageBlock}
            style={style}
            data-testid="imageBlock"
          >
            {!imageSource && (
              <div className={styles.icon}>
                <Icon name={iconName} />
              </div>
            )}
            {!isComplete && (
              <div className={styles.progress}>
                <ProgressBar
                  size="small"
                  currentStep={file.progress * 100}
                  totalSteps={100}
                />
              </div>
            )}
          </div>
          <div className={styles.contentBlock}>
            <Typography element="span">{file.name}</Typography>
            <Typography element="p" size="small" textColor="greyBlueDark">
              {fileSize}
            </Typography>
          </div>
          {isComplete && onDelete && (
            <div className={styles.actionBlock}>
              <Button
                onClick={onDelete}
                type="tertiary"
                variation="destructive"
                icon="trash"
                ariaLabel="Delete"
              />
            </div>
          )}
        </div>
      )}
      {display === "thumbnail" && (
        <div
          className={styles.thumbnail}
          style={{
            width: thumbnailDimensions.width,
            height: thumbnailDimensions.height,
          }}
          onClick={onClick}
        >
          <div
            className={styles.imageBlock}
            style={{
              ...style,
              width: "inherit",
              height: "inherit",
            }}
            data-testid="imageBlock"
          >
            {!imageSource && (
              <div className={styles.thumbailIconWrapper}>
                <div className={styles.thumbnailIcon}>
                  <Icon name={iconName} />
                </div>
                <div className={styles.thumbnailFilename}>
                  <Typography element="span">{file.name}</Typography>
                </div>
              </div>
            )}
            {!isComplete && (
              <div className={styles.progress}>
                <ProgressBar
                  size="small"
                  currentStep={file.progress * 100}
                  totalSteps={100}
                />
              </div>
            )}
          </div>
          {/* <img
            src={imageSource}
            alt="Image could not be rendered"
            width={thumbnailDimensions.width}
            height={thumbnailDimensions.height}
          /> */}
          {isComplete && onDelete && (
            <>
              <div className={styles.deleteButton}>
                <Button
                  onClick={() => setDeleteConfirmationOpen(true)}
                  variation="destructive"
                  type="tertiary"
                  icon="trash"
                  ariaLabel="Delete Thumbnail"
                />
              </div>
              <ConfirmationModal
                title="Should we?"
                message={`Let's do **something**!`}
                confirmLabel="Do it"
                open={deleteConfirmationOpen}
                onConfirm={() => onDelete?.()}
                onRequestClose={() => setDeleteConfirmationOpen(false)}
              />
            </>
          )}
          {/* {!isComplete && (
            <Overlay>
              <Centered>
                <ProgressBar
                  size={displaySize === "default" ? "small" : "base"}
                  currentStep={file.progress * 100}
                  totalSteps={100}
                />
              </Centered>
            </Overlay>
          )} */}
        </div>
      )}
    </>
  );
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
