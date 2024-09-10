import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Avatar } from "@jobber/components/Avatar";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks/index";
import styles from "../../Chip.css";

export function ChipPrefix({ children }: PropsWithChildren) {
  const avatarOrIcon = useChildComponent(
    children,
    d => d.type === Avatar || d.type === Icon,
  );

  if (!avatarOrIcon) return children as React.ReactElement;

  return <span className={classNames(styles.prefix)}>{avatarOrIcon}</span>;
}
