import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./ThumbnailImage.module.css";
import type { FileUpload } from "../InputFile";
import { Glimmer } from "../Glimmer";

interface InternalThumbnailImageProps {
  readonly file: FileUpload;

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
  };

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: React.CSSProperties;
  };
}

export function InternalThumbnailImage({
  file,
  UNSAFE_className,
  UNSAFE_style,
}: InternalThumbnailImageProps) {
  const { name, src } = file;
  const [imageSource, setImageSource] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    src().then(url => setImageSource(url));
  }, []);

  return (
    <>
      {!imageLoaded && <Glimmer size="auto" />}

      <img
        src={imageSource}
        onError={file.onImageLoadError}
        onLoad={handleImageLoad}
        alt={name}
        data-testid="internalThumbnailImage"
        className={classNames(
          styles.image,
          { [styles.hidden]: !imageLoaded },
          UNSAFE_className?.container,
        )}
        style={UNSAFE_style?.container}
      />
    </>
  );

  function handleImageLoad() {
    setImageLoaded(true);
  }
}
