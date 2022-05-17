import React, { useState } from "react";
import styles from "./Gallery.css";
import { GalleryProps } from "./GalleryTypes";
import { LightBox } from "../LightBox";
import { FormatFile } from "../FormatFile";
import { Button } from "../Button";

export function Gallery({ files, size = "default", max }: GalleryProps) {
  const images = files
    .filter(file => file.type.startsWith("image/"))
    .map(file => {
      return { title: file.name, url: file.src };
    });

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
              />
            </div>
          );
        })}
        {max && files.length > max && !displayPastMax && (
          <Button
            type="tertiary"
            label={`+ ${files.length - max}`}
            onClick={() => {
              setDisplayPastMax(true);
            }}
          />
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
    setLightboxIndex(index);
    setLightboxOpen(true);
  }
  function handleLightboxClose() {
    setLightboxOpen(false);
  }
}
