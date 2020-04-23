import React, { CSSProperties } from "react";
import classnames from "classnames";
import styles from "./Avatar.css";

interface AvatarProps {
  /**
   * Size of the avatar
   * @default 'medium'
   */
  readonly size?: "medium" | "large";
  readonly initials?: string;
  readonly color?: string;
  readonly imageUrl?: string;

  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Text to display.
   */
  readonly text: string;
}

export function Avatar({
  size = "medium",
  initials,
  color,
  imageUrl,
}: AvatarProps) {
  const className = classnames(
    styles.avatar,
    styles[size],
    imageUrl && color ? styles.border : "",
  );

  const style: CSSProperties = {
    backgroundColor: color,
    borderColor: color,
  };

  if (imageUrl) {
    style.backgroundImage = `url(${imageUrl})`;
  }

  return (
    <div className={className} style={style}>
      {initials && !imageUrl ? (
        <span className={styles.initials}>{initials}</span>
      ) : (
        ""
      )}
    </div>
  );
}
