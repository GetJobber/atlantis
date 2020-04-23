import React, { CSSProperties } from "react";
import classnames from "classnames";
import Color from "color";
import styles from "./Avatar.css";
import { Icon } from "../Icon";

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
    [styles.isDark]: color && isDark(color),
  });

  return (
    <div
      className={className}
      style={style}
      role={imageUrl && "img"}
      aria-label={name}
    >
      {initials && !imageUrl ? <Initials initials={initials} /> : ""}
      {!initials && !imageUrl ? (
        <Icon name="person" color={color && isDark(color) ? "white" : "blue"} />
      ) : (
        ""
      )}
    </div>
  );

  function isDark(colorToCheck: string) {
    if (colorToCheck) {
      try {
        return Color(deconstructCssCustomProperty(colorToCheck)).isDark();
      } catch (err) {
        console.log(err);
      }
    }

    return;
  }
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

function deconstructCssCustomProperty(color: string) {
  if (!color) {
    return;
  }

  if (!color.toLowerCase().startsWith("var(")) {
    return color;
  }

  const value = color
    .replace("var(", "")
    .slice(0, -1)
    .split(" ")
    .join("");
  return getComputedStyle(document.documentElement)
    .getPropertyValue(value)
    .trim();
}
