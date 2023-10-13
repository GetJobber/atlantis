import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Avatar } from "@jobber/components/Avatar";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks/index";
import styles from "../../Chip.css";

export function ChipPrefix({ children, showBG }: ChipPrefixProps) {
  const singleChild = useChildComponent(
    children,
    d => d.type === Avatar || d.type === Icon,
  );

  return (
    <span
      className={classNames(
        styles.prefix,
        !singleChild && styles.empty,
        showBG,
      )}
    >
      {singleChild}
    </span>
  );
}

interface ChipPrefixProps extends PropsWithChildren {
  readonly showBG?: boolean;
}
