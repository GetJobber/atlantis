import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { useChildComponent } from "../../hooks/index";
import styles from "../../Chip.css";
import { Avatar } from "../../../Avatar";
import { Icon } from "../../../Icon";

export function ChipPrefix({ children }: PropsWithChildren) {
  const singleChild = useChildComponent(
    children,
    d => d.type === Avatar || d.type === Icon,
  );

  return (
    <span className={classNames(styles.prefix, !singleChild && styles.empty)}>
      {singleChild}
    </span>
  );
}
