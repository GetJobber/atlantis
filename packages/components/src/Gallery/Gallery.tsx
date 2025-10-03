import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Gallery.module.css";
import type { GalleryFile, GalleryProps } from "./GalleryTypes";
import { LightBox } from "../LightBox";
import { FormatFile } from "../FormatFile";
import { Button } from "../Button";
import { isSafari } from "../utils/getClientBrowser";

export function Gallery({ files, size = "base", max, onDelete }: GalleryProps) {
  const [images, setImages] = useState<{ title: string; url: string }[]>([]);
  const [filesToImageIndex, setFilesToImageIndex] = useState<
    (number | undefined)[]
  >([]);

  React.useEffect(() => {
    generateImagesArray(files).then(result => {
      setImages(result.images);
      setFilesToImageIndex(result.filesToImageIndex);
    });
  }, [files]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayPastMax, setDisplayPastMax] = useState(max ? false : true);

  const visibleFiles = displayPastMax ? files : files.slice(0, max);

  return (
    <>
      <div className={size === "large" ? styles.galleryLarge : styles.gallery}>
        {visibleFiles.map((file, index) => {
          return (
            <FormatFile
              key={file.key}
              file={{
                ...file,
                src: () =>
                  Promise.resolve(file.thumbnailSrc || getFileSrc(file)),
              }}
              display="compact"
              displaySize={size}
              onClick={() => {
                handleThumbnailClicked(index);
              }}
              onDelete={onDelete ? () => onDelete?.(file) : undefined}
            />
          );
        })}

        {max && files.length > max && !displayPastMax && (
          <div
            className={classNames(
              styles.showMoreButton,
              styles[`${size}ShowMoreButton` as keyof typeof styles],
            )}
          >
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

  async function handleThumbnailClicked(index: number) {
    if (
      files[index].type.startsWith("image/") &&
      isSupportedImageType(files[index])
    ) {
      handleLightboxOpen(index);
    } else {
      window.open(await getFileSrc(files[index]), "_blank");
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

async function getFileSrc(file: GalleryFile) {
  return typeof file.src === "string" ? file.src : file.src();
}

function isSupportedImageType(file: GalleryFile) {
  const userAgent =
    typeof document === "undefined" ? "" : window.navigator.userAgent;
  const nonHeicImage = !file.type.startsWith("image/heic");
  const nonSVGImage = !file.type.startsWith("image/svg");

  return (nonHeicImage || isSafari(userAgent)) && nonSVGImage;
}

async function generateImagesArray(files: GalleryFile[]) {
  const images = [];
  const filesToImageIndex = [];
  let imageIndex = 0;

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.startsWith("image/") && isSupportedImageType(files[i])) {
      images.push({ title: files[i].name, url: await getFileSrc(files[i]) });
      filesToImageIndex.push(imageIndex);
      imageIndex++;
    } else {
      filesToImageIndex.push(undefined);
    }
  }

  return { images, filesToImageIndex };
}
