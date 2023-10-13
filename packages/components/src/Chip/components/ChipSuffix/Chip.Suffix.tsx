import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({ children, className, showBG }: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }

  return (
    <span
      className={classNames(
        styles.suffix,
        className,
        !singleChild && styles.empty,
        showBG,
      )}
    >
      {singleChild}
    </span>
  );
}

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly showBG?: boolean;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark"];
