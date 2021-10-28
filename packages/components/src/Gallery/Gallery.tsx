import React, { useState } from "react";
import styles from "./Gallery.css";
import { Card } from "./Card";
import { GalleryProps } from "./GalleryTypes";
import { useFiles } from "./useFiles";
import { LightBox } from "../LightBox";

export function Gallery({ files, size = "large" }: GalleryProps) {
  const { items, images } = useFiles(files);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      <div className={styles.gallery}>
        {items.map(item => {
          function handlePreviewableCardClick() {
            return () => {
              handleLightboxOpen(
                images.findIndex(image => image.url == item.src),
              );
            };
          }
          return (
            <Card
              key={item.name}
              file={item}
              size={size}
              {...(item.icon
                ? { icon: item.icon }
                : { onClick: handlePreviewableCardClick() })}
            />
          );
        })}
        <Card
          extra={1}
          size={size}
          onClick={() => {
            handleLightboxOpen(0);
          }}
        />
      </div>
      <LightBox
        open={lightboxOpen}
        images={images}
        imageIndex={lightboxIndex}
        onRequestClose={handleLightboxClose}
      />
    </>
  );

  function handleLightboxOpen(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }
  function handleLightboxClose() {
    setLightboxOpen(false);
  }
}
