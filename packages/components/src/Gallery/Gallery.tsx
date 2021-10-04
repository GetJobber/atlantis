import React, { useState } from "react";
import classnames from "classnames";
import styles from "./Gallery.css";
import { GalleryCard } from "./GalleryCard";
import { File, FileIconsNames } from "./GalleryTypes";
import { ExtraCard } from "./ExtraCard";
import { LightBox } from "../LightBox";

interface GalleryProps {
  /**
   * The size of the Gallery and it's files
   * @default "base"
   */
  size?: "small" | "base" | "large";
  files: File[];
}

export function Gallery({ files }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-base)" }}
      >
        {files.map(file => {
          const { name, src } = file;
          const icon = fileIcon(file);
          return (
            <GalleryCard
              key={name}
              name={name}
              src={src}
              {...(icon ? { icon } : { onClick: handleLightboxOpen })}
            />
          );
        })}
        <div style={{ maxWidth: "fit-content" }}>
          <ExtraCard number={5} />
        </div>
      </div>
      <LightBox
        open={lightboxOpen}
        images={files
          .filter(isImage)
          .map(image => ({ title: image.name, url: image.src }))}
        onRequestClose={handleLightboxClose}
      />
    </>
  );

  function handleLightboxOpen() {
    setLightboxOpen(true);
  }
  function handleLightboxClose() {
    setLightboxOpen(false);
  }

  function isImage(file: File) {
    // eslint-disable-next-line no-null/no-null
    return file.type.match(/^image\/.*$/) !== null;
  }

  function isVideo(file: File) {
    // eslint-disable-next-line no-null/no-null
    return file.type.match(/^video\/.*$/) !== null;
  }

  function fileIcon(file: File): FileIconsNames | undefined {
    if (isImage(file)) return undefined;
    if (isVideo(file)) return "video";

    switch (file.type) {
      case "application/pdf": {
        return "pdf";
      }
      case "application/msword": {
        return "word";
      }
      case "application/vnd.ms-excel": {
        return "excel";
      }
      default: {
        return "file";
      }
    }
  }
}
