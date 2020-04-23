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
   * @protected
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
