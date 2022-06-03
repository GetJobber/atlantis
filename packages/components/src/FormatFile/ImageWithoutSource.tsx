import React from "react";
import classNames from "classnames";
import { IconNames } from "@jobber/design";
import styles from "./FormatFile.css";
import { DisplaySize } from "./sizeToDimensions";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

interface ImageWithoutSourceProps {
  displayIsExpanded: boolean;
  iconName: IconNames;
  displaySize: DisplaySize;
  filename: string;
  isComplete: boolean;
}

export function ImageWithoutSource({
  displayIsExpanded,
  iconName,
  displaySize,
  filename,
  isComplete,
}: ImageWithoutSourceProps) {
  const iconElement = (
    <div className={styles.icon}>
      <Icon name={iconName} color="greyBlue" />
    </div>
  );

  if (displayIsExpanded) {
    return iconElement;
  }

  return (
    <div className={classnamesForFileContentWrapper(isComplete, displaySize)}>
      {iconElement}
      <div
        className={
          displaySize === "default"
            ? styles.thumbnailFilenameSmall
            : styles.thumbnailFilename
        }
      >
        <Typography element="span">{filename}</Typography>
      </div>
    </div>
  );
}

function classnamesForFileContentWrapper(
  isComplete: boolean,
  displaySize: DisplaySize,
) {
  const fileContentWrapperClassnames = [styles.fileContentWrapper];

  if (!isComplete) {
    fileContentWrapperClassnames.push(styles.fileContentWrapperInProgress);
  }

  if (displaySize === "large") {
    fileContentWrapperClassnames.push(styles.fileContentWrapperLarge);
  }

  return classNames(fileContentWrapperClassnames);
}
