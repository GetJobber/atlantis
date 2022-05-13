import React from "react";
import classnames from "classnames";
import styles from "./Thumbnail.css";

const sizeToDimensions = {
  default: {
    width: 56,
    height: 56,
  },
  large: {
    width: 168,
    height: 168,
  },
};

interface ThumbnailProps {
  /**
   * Size of the thumbnail
   */
  readonly size: keyof typeof sizeToDimensions;

  /**
   * Source of the image the thumbnail displays
   */
  readonly src: string;

  /**
   * Source of the image the thumbnail displays
   */
  readonly deletable: boolean;

  /**
   * Click handler.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function Thumbnail({ size = "default", src, onClick }: ThumbnailProps) {
  const className = classnames(styles.thumbnail);
  const thumbnailDimensions = sizeToDimensions[size];

  return (
    <div className={className} onClick={onClick}>
      <img
        src={src}
        alt="Image could not be rendered"
        width={thumbnailDimensions.width}
        height={thumbnailDimensions.height}
      />
    </div>
  );
}
