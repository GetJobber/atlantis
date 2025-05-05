import React from "react";
import classNames from "classnames";
import styles from "./Thumbnail.module.css";
import { InternalThumbnailImage } from "./ThumbnailImage";
import { Icon, IconNames } from "../Icon";
import { FileUpload } from "../InputFile";
import { Typography } from "../Typography";
import { isSafari } from "../utils/getClientBrowser";

interface InternalThumbnailProps {
  readonly compact?: boolean;
  readonly size: "base" | "large";
  readonly file: FileUpload;
}

export function Thumbnail({
  compact = false,
  size,
  file,
}: InternalThumbnailProps) {
  const { name, type } = file;
  const iconName = getIconNameFromType(type);
  const hasName = Boolean(name) && compact;

  if (type.startsWith("image/") && isSupportedImageType(file)) {
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
  if (mimeType.startsWith("image/")) return "image";
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

function isSupportedImageType(file: FileUpload) {
  const userAgent =
    typeof document === "undefined" ? "" : window.navigator.userAgent;
  const nonHeicImage = !file.type.startsWith("image/heic");
  const nonSVGImage = !file.type.startsWith("image/svg");

  return (nonHeicImage || isSafari(userAgent)) && nonSVGImage;
}
