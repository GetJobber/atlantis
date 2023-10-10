import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { useChildComponent } from "@jobber/components/hooks/useChildComponent";
import styles from "../../Chip.css";
import { Icon } from "../../../Icon";

export function ChipSuffix({ children, className }: ChipSuffixProps) {
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
      )}
    >
      {singleChild}
    </span>
  );
}

export interface ChipSuffixProps extends PropsWithChildren {
  className?: string;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark"];
