import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import icons from "./Icons.css";
import sizes from "./Sizes.css";

export type IconNames = keyof typeof icons;

interface IconProps {
  /** The icon to show.  */
  readonly iconName: IconNames;
  readonly size?: keyof typeof sizes;
}

export function Icon({ iconName, size = "base" }: IconProps) {
  const iconClasses = classnames(styles.icon, icons[iconName], sizes[size]);
  return <div className={iconClasses} />;
}
