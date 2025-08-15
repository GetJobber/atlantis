import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import { Avatar } from "@jobber/components/Avatar";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks/index";
import styles from "../../Chip.module.css";

export function ChipPrefix({ children }: PropsWithChildren) {
  const avatarOrIcon = useChildComponent(
    children,
    d => d.type === Avatar || d.type === Icon,
  );

  if (!avatarOrIcon) return <>{children}</>;

  return <span className={classNames(styles.prefix)}>{avatarOrIcon}</span>;
}
