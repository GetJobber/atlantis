import React from "react";
import { IconName } from "./IconName";
import styles from "./Icon.css";

interface IconProps {
  /** The icon to show.  */
  readonly iconName: IconName;
}

export function Icon({ iconName }: IconProps) {
  return <div className={`${styles[iconName]} ${styles.icon}`} />;
}
