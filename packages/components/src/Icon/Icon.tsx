import React from "react";
import styles from "./Icon.css";
import icons from "./Icons.css";

interface IconProps {
  /** The icon to show.  */
  readonly iconName: keyof typeof icons;
}

export function Icon({ iconName }: IconProps) {
  return <div className={`${icons[iconName]} ${styles.icon}`} />;
}
