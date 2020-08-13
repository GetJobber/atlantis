import React from "react";
import classnames from "classnames";
import styles from "./FileCard.css";
import { Button } from "../Button";

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
  readonly fileDetails: AtFile;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
}

export function FileCard({ fileDetails, onDelete }: FileCardProps) {
  const className = classnames(styles.fileCard);

  return (
    <div className={className}>
      <p>{JSON.stringify(fileDetails)}</p>
      <h2>{fileDetails.src}</h2>
      {onDelete && (
        <Button onClick={onDelete} type="destructive" icon="trash" />
      )}
    </div>
  );
}
