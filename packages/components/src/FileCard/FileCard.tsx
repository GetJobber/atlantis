import React from "react";
import classnames from "classnames";
import styles from "./FileCard.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { ProgressBar } from "../ProgressBar";

interface AtFile {
  /**
   * File Identifier
   */
  readonly id: string;
  /**
   * The name of the file.
   */
  readonly name: string;
  /**
   * The [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type of the file
   */
  readonly type: string;
  /**
   * The size of the file in bytes.
   */
  readonly size: number;
  /**
   * The progress of a file upload between 0 and 1.
   * - `0` represents Upload just started.
   * - `1` represents a complete upload.
   */
  readonly progress: number;
  /**
   * The url of the file.
   */
  readonly src: string;
  /**
   * If the file is an image the url of the thumbnail.
   */
  readonly thumbnailSrc?: string;
}

interface FileCardProps {
  /**
   * File details object.
   */
  readonly file: AtFile;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
}

export function FileCard({ file, onDelete }: FileCardProps) {
  const className = classnames(styles.fileCard);
  const imageBlock = classnames(styles.imageBlock);
  const actionButton = classnames(styles.actionButton);

  const isComplete = file.progress >= 1;
  const icon = isComplete ? "trash" : "remove";
  const variation = isComplete ? "destructive" : "cancel";

  const iconType = getIconFromType(file.type);

  return (
    <div className={className}>
      <div className={imageBlock}>
        <ProgressBar
          size="small"
          currentStep={file.progress * 100}
          totalSteps={100}
        />
        {false && file.thumbnailSrc && <img src={file.thumbnailSrc} />}
      </div>
      <div className={classnames(styles.contentBlock)}>
        <p className={classnames(styles.fileName)}>
          <Typography element="span" weight="bold">
            {file.name}
          </Typography>
        </p>
        <Typography element="p" size="small" textColor="greyBlueDark">
          {file.size}KB {iconType}
        </Typography>
      </div>
      {onDelete && (
        <div className={actionButton}>
          <Button
            onClick={onDelete}
            type="tertiary"
            variation={variation}
            icon={icon}
          />
        </div>
      )}
    </div>
  );

  function getIconFromType(mimeType: string): string {
    const lookup = {
      camera: ["image/gif", "image/jpeg", "image/png"],
      pdf: ["application/pdf"],
      video: ["video/mpeg"],
      excel: ["application/vnd.ms-excel"],
      file: ["text/plain"],
    };

    for (const [key, value] of Object.entries(lookup)) {
      if (value.findIndex(element => element === mimeType) != -1) {
        return key;
      }
    }
    return "file";
  }
}

// getHumanReadableFileSize;
