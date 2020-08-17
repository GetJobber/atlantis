import React, { useState } from "react";
import filesize from "filesize";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { ProgressBar } from "../ProgressBar";

interface FileUpload {
  /**
   * File Identifier
   */
  readonly key: string;
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
   * The data url of the file.
   */
  src?(): Promise<string>;
}

interface FormatFileProps {
  /**
   * File details object.
   */
  readonly file: FileUpload;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
}

export function FormatFile({ file, onDelete }: FormatFileProps) {
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
      <div className={styles.imageBlock} style={style}>
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
        <Typography element="span" fontWeight="semiBold">
          {file.name}
        </Typography>
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
  );

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
}
