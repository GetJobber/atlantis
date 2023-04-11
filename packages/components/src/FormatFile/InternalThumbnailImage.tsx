import React, { useState } from "react";
import classNames from "classnames";
import styles from "./InternalThumbnailImage.css";
import { FileUpload } from "../InputFile";

interface InternalThumbnailImageProps {
  readonly file: FileUpload;
}

export function InternalThumbnailImage({ file }: InternalThumbnailImageProps) {
  const { name, src } = file;
  const [imageSource, setImageSource] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  if (!imageSource) {
    src().then(url => setImageSource(url));
  }

  return (
    <>
      {!imageLoaded && (
        <div
          className={styles.glimmer}
          data-testid="internalThumbnailImageLoader"
        />
      )}

      <img
        src={imageSource}
        onLoad={handleImageLoad}
        alt={name}
        data-testid="internalThumbnailImage"
        className={classNames(styles.image, { [styles.hidden]: !imageLoaded })}
      />
    </>
  );

  function handleImageLoad() {
    setImageLoaded(true);
  }
}
