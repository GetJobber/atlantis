import React, { useEffect, useState } from "react";
import ExternalLightBox from "react-image-lightbox";
import styles from "./LightBox.css";

// Library requires fetching its CSS.
// eslint-disable-next-line import/no-internal-modules
import "react-image-lightbox/style.css";

interface PresentedImage {
  title?: string;
  caption?: string;
  url: string;
}

interface LightBoxProps {
  /**
   * Specify if the Lightbox is open or closed.
   */
  readonly open: boolean;
  /**
   * Images is an array of objects defining a LightBox image. This object consists of
   * `title`, `caption` and `url`. `title` and `caption` are optional, `url` is
   * required, for each image.
   */
  readonly images: PresentedImage[];
  /**
   * Use this to specify which image in `images` to initialize the lightbox with.
   * This is useful when you have a collection of thumbnails as you only need one
   * collection of image urls, order doesn't matter.
   */
  readonly imageIndex?: number;
  /**
   * This function must set open to false in order to close the lightbox. Note there
   * is a 300ms easing animation on lightbox close that occurs before this function
   * is called.
   * This function receives the last image position viewed in the LightBox as an argument.
   */
  onRequestClose(lastPosition: number): void;
}

export function LightBox({
  open,
  images,
  imageIndex = 0,
  onRequestClose,
}: LightBoxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  let nextSrc = undefined;
  let prevSrc = undefined;
  if (images.length > 1) {
    nextSrc = images[(currentImageIndex + 1) % images.length].url;
    prevSrc =
      images[(currentImageIndex + images.length - 1) % images.length].url;
  }

  useEffect(() => {
    setCurrentImageIndex(imageIndex);
  }, [imageIndex]);

  return (
    <>
      {open && (
        <ExternalLightBox
          wrapperClassName={styles.wrapper}
          mainSrc={images[currentImageIndex].url}
          enableZoom={false}
          nextSrc={nextSrc}
          prevSrc={prevSrc}
          imageTitle={images[currentImageIndex].title}
          imageCaption={images[currentImageIndex].caption}
          onCloseRequest={() => onRequestClose(currentImageIndex)}
          onMovePrevRequest={handleMovePrevious}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </>
  );

  function handleMovePrevious() {
    setCurrentImageIndex(
      (currentImageIndex + images.length - 1) % images.length,
    );
  }

  function handleMoveNext() {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }
}
