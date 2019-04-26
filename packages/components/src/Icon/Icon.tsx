import React from "react";
import styles from "./Icon.css";
import { IconName } from "./IconName";

interface IconProps {
  /** The icon to show.  */
  readonly iconName: IconName;
}

export function Icon({ iconName }: IconProps) {
  console.log(IconName);
  debugger;
  return (
    <>
      <div className={`${styles[iconName]} ${styles.icon}`} />
    </>
  );
}
