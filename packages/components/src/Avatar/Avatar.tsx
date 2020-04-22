import React from "react";
import classnames from "classnames";
import styles from "./Avatar.css";

interface AvatarProps {
  /**
   * Size of the avatar
   * @default 'medium'
   */
  readonly size?: "medium" | "large";
  readonly initials?: string;

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

export function Avatar({ size = "medium", initials }: AvatarProps) {
  const className = classnames(styles.avatar, styles[size]);

  return (
    <div className={className}>
      {initials && <span className={styles.initials}>{initials}</span>}
    </div>
  );
}
