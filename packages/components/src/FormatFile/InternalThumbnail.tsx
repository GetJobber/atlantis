import React from "react";
import classNames from "classnames";
import styles from "./InternalThumbnail.css";
import { InternalThumbnailImage } from "./InternalThumbnailImage";
import { Icon, IconNames } from "../Icon";
import { FileUpload } from "../InputFile";
import { Typography } from "../Typography";

interface InternalThumbnailProps {
  readonly compact?: boolean;
  readonly size: "base" | "large";
  readonly file: FileUpload;
}

export function InternalThumbnail({
  compact = false,
  size,
  file,
}: InternalThumbnailProps) {
  const { name, type } = file;
  const iconName = getIconNameFromType(type);
  const hasName = Boolean(name) && compact;

  if (type.startsWith("image/")) {
    return <InternalThumbnailImage file={file} />;
  }

  return (
    <div
      className={classNames(styles.content, styles[size], {
        [styles.hasName]: hasName,
      })}
    >
      <Icon name={iconName} color="greyBlue" size={size} />

      {hasName && (
        <div className={styles.fileName}>
          <Typography element="span" textColor="text" numberOfLines={1}>
            {name}
          </Typography>
        </div>
      )}
    </div>
  );
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
