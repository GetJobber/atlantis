import React from "react";
import classNames from "classnames";
import styles from "./Thumbnail.module.css";
import { useThumbnailImage } from "./useThumbnailImage";
import { ThumbnailProps } from "./types";
import { useThumbnail } from "./useThumbnail";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { Glimmer } from "../Glimmer";

export function Thumbnail({ file, compact, size }: ThumbnailProps) {
  const { isSupportedImageType, hasName, iconName } = useThumbnail({
    file,
    compact,
  });

  return file.type.startsWith("image/") && isSupportedImageType() ? (
    <Thumbnail.Image file={file} />
  ) : (
    <div
      className={classNames(styles.content, styles[size], {
        [styles.hasName]: hasName,
      })}
    >
      <Icon name={iconName} color="greyBlue" size={size} />

      {hasName && (
        <div className={styles.fileName}>
          <Typography element="span" textColor="text" numberOfLines={1}>
            {file.name}
          </Typography>
        </div>
      )}
    </div>
  );
}

Thumbnail.Image = function ThumbnailImage({
  file,
}: Pick<ThumbnailProps, "file">) {
  const { imageLoaded, imageSource, handleImageLoad } = useThumbnailImage({
    file,
  });

  return (
    <>
      {!imageLoaded && <Glimmer size="auto" />}

      <img
        src={imageSource}
        onError={file.onImageLoadError}
        onLoad={handleImageLoad}
        alt={file.name}
        data-testid="internalThumbnailImage"
        className={classNames(styles.image, {
          [styles.hidden]: !imageLoaded,
        })}
      />
    </>
  );
};
