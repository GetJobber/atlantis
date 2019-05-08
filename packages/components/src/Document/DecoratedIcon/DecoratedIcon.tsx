import React from "react";
import { IconName, Icon } from "../../Icon";
import styles from "./DecoratedIcon.css";

interface DecoratedIconProps {
  iconName: IconName;
}

export function DecoratedIcon({ iconName }: DecoratedIconProps) {
  return (
    <span className={styles.iconDecorator}>
      <Icon iconName={iconName} />
    </span>
  );
}
