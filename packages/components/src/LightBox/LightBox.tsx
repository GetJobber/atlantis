import React, { useState } from "react";
import ExternalLightBox from "react-image-lightbox";

// Library requires fetching its CSS.
// eslint-disable-next-line import/no-internal-modules
import "react-image-lightbox/style.css";

interface PresentedImage {
  title?: string;
  caption?: string;
  url: string;
}

interface LightBoxProps {
  readonly open: boolean;
  readonly images: PresentedImage[];
  onRequestClose(): void;
}

export function LightBox({
  open = false,
  images,
  onRequestClose,
}: LightBoxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let nextSrc = undefined;
  let prevSrc = undefined;
  if (images.length > 1) {
    nextSrc = images[(currentImageIndex + 1) % images.length].url;
    prevSrc =
      images[(currentImageIndex + images.length - 1) % images.length].url;
  }

  return (
    <>
      {open && (
        <ExternalLightBox
          mainSrc={images[currentImageIndex].url}
          nextSrc={nextSrc}
          prevSrc={prevSrc}
          imageTitle={images[currentImageIndex].title}
          imageCaption={images[currentImageIndex].caption}
          onCloseRequest={onRequestClose}
          onMovePrevRequest={() =>
            setCurrentImageIndex(
              (currentImageIndex + images.length - 1) % images.length,
            )
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
}
