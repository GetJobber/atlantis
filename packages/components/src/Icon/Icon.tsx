import React from "react";
import styles from "./Icon.css";
import icons from "./Icons.css";

interface IconProps {
  /** The icon to show.  */
  readonly name: keyof typeof icons;
}

export function Icon({ name }: IconProps) {
  return <div className={`${icons[name]} ${styles.icon}`} />;
}
