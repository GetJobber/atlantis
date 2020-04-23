import React, { CSSProperties } from "react";
import classnames from "classnames";
import styles from "./Avatar.css";
import { isDark } from "./utilities";
import { Icon } from "../Icon";

type AvatarSize = "base" | "large";

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
  readonly size?: AvatarSize;
}

export function Avatar({
  imageUrl,
  name,
  initials,
  size = "base",
  color,
}: AvatarProps) {
  const style: CSSProperties = {
    backgroundColor: color,
    borderColor: color,
  };

  if (imageUrl) {
    style.backgroundImage = `url(${imageUrl})`;
  }

  const className = classnames(styles.avatar, {
    [styles.large]: size === "large",
    [styles.hasBorder]: imageUrl && color,
    [styles.isDark]: isDark(color),
  });

  return (
    <div
      className={className}
      style={style}
      role={imageUrl && "img"}
      aria-label={name}
    >
      {!imageUrl && (
        <Initials initials={initials} dark={isDark(color)} iconSize={size} />
      )}
    </div>
  );
}

interface InitialsProps {
  readonly dark?: boolean;
  readonly iconSize?: AvatarSize;
  readonly initials?: string;
}

function Initials({
  initials,
  dark = false,
  iconSize = "base",
}: InitialsProps) {
  if (!initials) {
    return (
      <Icon name="person" color={dark ? "white" : "blue"} size={iconSize} />
    );
  }
  const className = classnames(styles.initials, {
    [styles.smallInitials]: initials.length > 2,
  });
  return <span className={className}>{initials.substr(0, 3)}</span>;
}
