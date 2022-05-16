import React from "react";
import classnames from "classnames";
import styles from "./Thumbnail.css";
import { Button } from "../Button";

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
   * Click handler.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * On delete button clicked handler.
   */
  onDeleteClicked?(): void;
}

export function Thumbnail({
  size = "default",
  src,
  onClick,
  onDeleteClicked,
}: ThumbnailProps) {
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
      {onDeleteClicked && (
        <div className={styles.deleteButton}>
          <Button
            onClick={() => onDeleteClicked?.()}
            variation="destructive"
            type="tertiary"
            icon="trash"
            ariaLabel="Delete Thumbnail"
          />
        </div>
      )}
    </div>
  );
}
