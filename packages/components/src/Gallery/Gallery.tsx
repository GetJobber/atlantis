import React, { RefObject, useMemo, useState } from "react";
import { useResizeObserver } from "@jobber/hooks";
import styles from "./Gallery.css";
import { Card } from "./Card";
import { GalleryProps } from "./GalleryTypes";
import { useFiles } from "./useFiles";
import { LightBox } from "../LightBox";

export function Gallery({ files, size = "base" }: GalleryProps) {
  const { items, images } = useFiles(files);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [ref, { exactWidth = 0 }] = useResizeObserver();

  const [max, extra] = useMemo(() => {
    const cardSize = 48;
    const cardGap = 12 + 1;
    const maxNumberOfRows = 2;
    const cardPerRows = Math.floor(exactWidth / (cardSize + cardGap));
    console.log({ maxNumberOfRows, cardPerRows });
    const maximum = maxNumberOfRows * cardPerRows;
    return items.length >= maximum
      ? [maximum - 1, items.length - maximum + 1]
      : [maximum, undefined];
  }, [items, size, exactWidth]);

  return (
    <>
      <div ref={ref as RefObject<HTMLDivElement>} className={styles.gallery}>
        {items.slice(0, max).map(item => {
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
        {extra && (
          <Card
            extra={extra}
            size={size}
            onClick={() => {
              handleLightboxOpen(extra);
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

  function handleLightboxOpen(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }
  function handleLightboxClose() {
    setLightboxOpen(false);
  }
}
