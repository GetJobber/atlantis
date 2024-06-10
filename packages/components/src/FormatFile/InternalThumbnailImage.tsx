import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./InternalThumbnailImage.css";
import { FileUpload } from "../InputFile";
import { Glimmer } from "../Glimmer";

const RETRY_COUNT = 4;
interface InternalThumbnailImageProps {
  readonly file: FileUpload;
}

export function InternalThumbnailImage({ file }: InternalThumbnailImageProps) {
  const { name, src } = file;
  const [imageSource, setImageSource] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    src().then(url => setImageSource(url));
  }, []);

  return (
    <>
      {!imageLoaded && <Glimmer size="auto" />}

      <img
        key={retryCount}
        src={imageSource}
        onLoad={handleImageLoad}
        onError={handleImageError}
        alt={name}
        data-testid="internalThumbnailImage"
        className={classNames(styles.image, { [styles.hidden]: !imageLoaded })}
      />
    </>
  );

  function handleImageLoad() {
    setImageLoaded(true);
  }

  function handleImageError() {
    if (retryCount < RETRY_COUNT) {
      setRetryCount(retryCount + 1);
    }
  }
}
