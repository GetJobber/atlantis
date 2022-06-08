import React, { useState } from "react";
import styles from "./Gallery.css";
import { File, GalleryProps } from "./GalleryTypes";
import { LightBox } from "../LightBox";
import { FormatFile } from "../FormatFile";
import { Button } from "../Button";

export function Gallery({ files, size = "base", max }: GalleryProps) {
  const { images, filesToImageIndex } = generateImagesArray(files);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayPastMax, setDisplayPastMax] = useState(false);

  return (
    <>
      <div className={size === "large" ? styles.galleryLarge : styles.gallery}>
        {files.map((file, index) => {
          if (max && !displayPastMax && index + 1 > max) {
            return <></>;
          }
          return (
            <div key={file.key}>
              <FormatFile
                file={{ ...file, src: () => Promise.resolve(file.src) }}
                display="compact"
                displaySize={size}
                onClick={() => {
                  handleThumbnailClicked(index);
                }}
                onDelete={file.onDelete}
              />
            </div>
          );
        })}
        {max && files.length > max && !displayPastMax && (
          <div className={styles[`${size}ShowMoreButton`]}>
            <Button
              type="tertiary"
              size={size}
              label={`+ ${files.length - max}`}
              fullWidth
              onClick={() => {
                setDisplayPastMax(true);
              }}
            />
          </div>
        )}
      </div>
      <LightBox
        open={lightboxOpen}
        images={images}
        imageIndex={lightboxIndex}
        onRequestClose={handleLightboxClose}
      />
    </>
  );

  function handleThumbnailClicked(index: number) {
    if (files[index].type.startsWith("image/")) {
      handleLightboxOpen(index);
    } else {
      window.open(files[index].src, "_blank");
    }
  }

  function handleLightboxOpen(index: number) {
    const fileToImageIndex = filesToImageIndex[index];
    if (fileToImageIndex !== undefined) {
      setLightboxIndex(fileToImageIndex);
      setLightboxOpen(true);
    }
  }
  function handleLightboxClose() {
    setLightboxOpen(false);
  }
}

function generateImagesArray(files: File[]) {
  const images = [];
  const filesToImageIndex = [];
  let imageIndex = 0;

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.startsWith("image/")) {
      images.push({ title: files[i].name, url: files[i].src });
      filesToImageIndex.push(imageIndex);
      imageIndex++;
    } else {
      filesToImageIndex.push(undefined);
    }
  }

  return { images, filesToImageIndex };
}
