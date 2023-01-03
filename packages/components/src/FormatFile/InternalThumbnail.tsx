import React, { useState } from "react";
import classNames from "classnames";
import styles from "./InternalThumbnail.css";
import { Icon, IconNames } from "../Icon";
import { FileUpload } from "../InputFile";
import { Typography } from "../Typography";

interface InternalThumbnailProps {
  readonly name?: string;
  readonly hideName?: boolean;
  readonly size: "base" | "large";
  readonly file: FileUpload;
}

export function InternalThumbnail({
  name,
  hideName = false,
  size,
  file,
}: InternalThumbnailProps) {
  const [imageSource, setImageSource] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const iconName = getIconNameFromType(file.type);

  if (!imageSource && file.type.startsWith("image/")) {
    file.src().then(src => setImageSource(src));
  }
  const image = (
    <img
      src={imageSource}
      onLoad={() => {
        setImageLoaded(true);
      }}
      className={classNames(styles.image, { [styles.loading]: !imageLoaded })}
      alt={name}
      data-testid="internalThumbnailImage"
    />
  );
  if (imageLoaded) {
    return image;
  }

  return (
    <div className={classNames(styles.content, styles[size])}>
      {imageSource && image}
      <Icon name={iconName} color="greyBlue" />
      <div className={classNames(styles.fileName)}>
        {hideName && (
          <Typography element="span" textColor="text">
            {name}
          </Typography>
        )}
      </div>
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
