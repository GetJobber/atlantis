import React, { CSSProperties } from "react";
import classnames from "classnames";
import styles from "./Avatar.css";

interface AvatarProps {
  /**
   * A path to the image that will be displayed
   */
  readonly imageUrl?: string;
  /**
   * A users name to be used for assistive technology
   */
  readonly name?: string;
  readonly initials?: string;
  readonly color?: string;
  /**
   * @default 'medium'
   */
  readonly size?: "medium" | "large";
}

export function Avatar({
  imageUrl,
  name,
  initials,
  size = "medium",
  color,
}: AvatarProps) {
  const className = classnames(
    styles.avatar,
    styles[size],
    imageUrl && color ? styles.hasBorder : "",
  );

  const style: CSSProperties = {
    backgroundColor: color,
    borderColor: color,
  };

  if (imageUrl) {
    style.backgroundImage = `url(${imageUrl})`;
  }

  return (
    <div
      className={className}
      style={style}
      role={imageUrl && "img"}
      aria-label={name}
    >
      {initials && !imageUrl ? <Initials initials={initials} /> : ""}
    </div>
  );
}

interface InitialsProps {
  readonly initials: string;
}

function Initials({ initials }: InitialsProps) {
  const className = classnames(
    styles.initials,
    initials.length > 2 && styles.smallInitials,
  );
  return <span className={className}>{initials.substr(0, 3)}</span>;
}
