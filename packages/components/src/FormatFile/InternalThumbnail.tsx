import React, { useState } from "react";
import classNames from "classnames";
import styles from "./InternalThumbnail.css";
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
  const { name, type, src } = file;
  const [imageSource, setImageSource] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const iconName = getIconNameFromType(type);
  const hasName = Boolean(name);

  if (!imageSource && type.startsWith("image/")) {
    src().then(url => setImageSource(url));
  }

  const image = (
    <img
      src={imageSource}
      onLoad={handleImageLoad}
      className={classNames(styles.image, { [styles.loading]: !imageLoaded })}
      alt={name}
      data-testid="internalThumbnailImage"
    />
  );

  if (imageLoaded) {
    return image;
  }

  return (
    <div
      className={classNames(styles.content, styles[size], {
        [styles.hasName]: hasName,
      })}
    >
      {imageSource && image}

      <Icon name={iconName} color="greyBlue" size={size} />

      {compact && hasName && (
        <div className={styles.fileName}>
          <Typography element="span" textColor="text" numberOfLines={1}>
            {name}
          </Typography>
        </div>
      )}
    </div>
  );

  function handleImageLoad() {
    setImageLoaded(true);
  }
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
