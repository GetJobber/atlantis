import React, { useState } from "react";
import filesize from "filesize";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { ProgressBar } from "../ProgressBar";
import { FileUpload } from "../InputFile";

interface FormatFileProps {
  /**
   * File upload details object. (See FileUpload type.)
   */
  readonly file: FileUpload;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
  showMetaData?: boolean;
}

export function FormatFile({
  file,
  onDelete,
  showMetaData = true,
}: FormatFileProps) {
  const [imageSource, setImageSource] = useState<string>();
  const isComplete = file.progress >= 1;

  const iconName = getIconNameFromType(file.type);
  const fileSize = getHumanReadableFileSize(file.size);

  if (!imageSource && file.type.startsWith("image/") && file.src) {
    file.src().then(src => setImageSource(src));
  }

  const style = imageSource ? { backgroundImage: `url(${imageSource})` } : {};

  return (
    <div className={styles.formatFile}>
      <div className={styles.imageBlock} style={style} data-testid="imageBlock">
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
      {showMetaData && (
        <div className={styles.contentBlock}>
          <Typography element="span">{file.name}</Typography>
          <Typography element="p" size="small" textColor="greyBlueDark">
            {fileSize}
          </Typography>
        </div>
      )}
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
