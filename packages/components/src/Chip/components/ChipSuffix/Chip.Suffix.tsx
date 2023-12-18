import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { InternalChipButton } from "@jobber/components/Chips/InternalChipButton";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({ children, className }: ChipSuffixProps) {
  let singleChild = useChildComponent(
    children,
    d => d.type === Icon || d.type == InternalChipButton,
  );

  const iconName = singleChild?.props?.name || singleChild?.props?.icon;

  if (!allowedSuffixIcons.includes(iconName)) {
    singleChild = undefined;
  }

  return (
    <span
      className={classNames(
        styles.suffix,
        className,
        !singleChild && styles.empty,
      )}
    >
      {singleChild}
    </span>
  );
}

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
}

export const allowedSuffixIcons = [
  "cross",
  "add",
  "checkmark",
  "remove",
  "arrowDown",
];
