import React, { useState } from "react";
import filesize from "filesize";
import classNames from "classnames";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { FormatFileDeleteButton } from "./FormatFileDeleteButton";
import { sizeToDimensions } from "./sizeToDimensions";
import { Icon } from "../Icon";
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
   * @default "file"
   */
  readonly display?: "file" | "thumbnail";

  /**
   * The base dimensions of the thumbnail
   *
   * @default "default"
   */
  readonly displaySize?: keyof typeof sizeToDimensions;

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
  const imageBlockStyle = isComplete
    ? styles.imageBlock
    : classNames(styles.imageBlock, styles.imageBlockOverlay);

  return (
    <>
      {display === "file" && (
        <div className={styles.formatFile}>
          <div
            className={imageBlockStyle}
            style={style}
            data-testid="imageBlock"
          >
            {!imageSource && (
              <div className={styles.icon}>
                <Icon name={iconName} color="greyBlue" />
              </div>
            )}
            {!isComplete && <>{progressBar(file)}</>}
          </div>
          <div className={styles.contentBlock}>
            <Typography element="span">{file.name}</Typography>
            <Typography element="p" size="small" textColor="greyBlueDark">
              {fileSize}
            </Typography>
          </div>
          {isComplete && onDelete && (
            <>
              <FormatFileDeleteButton
                deleteButtonStyle={styles.actionBlock}
                deleteConfirmationOpen={deleteConfirmationOpen}
                setDeleteConfirmationOpen={setDeleteConfirmationOpen}
                onDelete={onDelete}
              />
            </>
          )}
        </div>
      )}
      {display === "thumbnail" && (
        <div
          className={
            imageSource
              ? styles.thumbnail
              : classNames(
                  styles.thumbnail,
                  styles[
                    `thumbnailNonImage${displaySize}` as keyof typeof styles
                  ],
                )
          }
          style={{
            width: thumbnailDimensions.width,
            height: thumbnailDimensions.height,
          }}
          onClick={onClick}
        >
          <div
            className={imageBlockStyle}
            style={{
              ...style,
              width: "inherit",
              height: "inherit",
            }}
            data-testid="imageBlock"
          >
            {!imageSource && (
              <div className={styles.fileContentWrapper}>
                <div className={styles.icon}>
                  <Icon name={iconName} color="greyBlue" />
                </div>
                <div
                  className={
                    displaySize === "default"
                      ? styles.thumbnailFilenameSmall
                      : styles.thumbnailFilename
                  }
                >
                  <Typography element="span">{file.name}</Typography>
                </div>
              </div>
            )}
            {!isComplete && <>{progressBar(file)}</>}
          </div>
          {isComplete && onDelete && (
            <>
              <FormatFileDeleteButton
                deleteButtonStyle={styles.deleteButton}
                deleteConfirmationOpen={deleteConfirmationOpen}
                size={displaySize}
                setDeleteConfirmationOpen={setDeleteConfirmationOpen}
                onDelete={onDelete}
              />
            </>
          )}
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
