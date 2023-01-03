import React from "react";
import classnames from "classnames";
import getHumanReadableFileSize from "filesize";
import styles from "./FormatFile.css";
import { FormatFileDeleteButton } from "./FormatFileDeleteButton";
import { InternalThumbnail } from "./InternalThumbnail";
import { FileUpload } from "../InputFile";
import { Text } from "../Text";
import { ProgressBar } from "../ProgressBar";

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
   * @default "base"
   */
  readonly displaySize?: "base" | "large";

  /**
   * Function to execute when format file is clicked
   */
  onClick?(event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;
}

export function FormatFile({
  file,
  display = "expanded",
  displaySize = "base",
  onDelete,
  onClick,
}: FormatFileProps) {
  const isComplete = file.progress >= 1;
  const fileSize = getHumanReadableFileSize(file.size);
  const wrapperClassNames = classnames(styles[display], {
    [styles[displaySize]]: display === "compact",
  });

  const DetailsContainer = isComplete && onClick ? "button" : "div";

  const detailsClassNames = classnames(styles.wrapper, {
    [styles[displaySize]]: display === "compact",
    [styles.hoverable]: isHoverable({ display, isComplete, onClick, onDelete }),
    [styles.clickable]: onClick,
    [styles.deleteable]: display === "compact",
  });

  const thumbnailContainerClassNames = classnames(
    styles.thumbnail,
    styles[displaySize],
  );

  return (
    <div className={wrapperClassNames}>
      <DetailsContainer
        type="button"
        className={detailsClassNames}
        onClick={isComplete ? onClick : undefined}
        tabIndex={0}
        aria-busy={!isComplete}
      >
        <div className={thumbnailContainerClassNames}>
          <InternalThumbnail
            name={file.name}
            hideName={display === "compact"}
            file={file}
            size={displaySize}
          />

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

        {display === "expanded" && (
          <div className={styles.contentBlock}>
            <Text size="large">{file.name}</Text>
            <Text size="small">{fileSize}</Text>
          </div>
        )}
      </DetailsContainer>
      {isComplete && onDelete && (
        <div className={styles.deleteButton}>
          <FormatFileDeleteButton
            size={display === "expanded" ? "large" : displaySize}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
}

function isHoverable({
  display,
  isComplete,
  onClick,
  onDelete,
}: Pick<FormatFileProps, "display" | "onClick" | "onDelete"> & {
  isComplete: boolean;
}): boolean {
  if (display === "compact") {
    return Boolean(isComplete && (onClick || onDelete));
  } else if (display === "expanded") {
    return Boolean(isComplete && onClick);
  }
  return false;
}
