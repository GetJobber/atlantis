import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import icons from "./Icons.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";

export type IconNames = keyof typeof icons;
export type IconColorNames = keyof typeof colors;

interface IconProps {
  /** The icon to show.  */
  readonly name: IconNames;
  readonly size?: keyof typeof sizes;
  readonly color?: IconColorNames;
}

export function Icon({ name, color, size = "base" }: IconProps) {
  const iconClasses = classnames(
    styles.icon,
    icons[name],
    sizes[size],
    color && colors[color],
  );
  return <div className={iconClasses} />;
}
