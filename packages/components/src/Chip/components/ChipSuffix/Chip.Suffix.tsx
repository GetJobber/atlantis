import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({
  children,
  className,
  showBG,
  value,
  onClick,
  onKeyDown,
}: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }
  const classes = classnames(
    styles.suffix,

    className,
    !singleChild && styles.empty,
    showBG,
    {
      [styles.clickableSuffix]: onClick,
    },
  );

  return (
    <span
      role={onClick && "button"}
      onClick={ev =>
        onClick?.(value, ev as React.MouseEvent<HTMLButtonElement>)
      }
      onKeyDown={(ev: React.KeyboardEvent<HTMLButtonElement>) =>
        onKeyDown?.(ev)
      }
      className={classes}
    >
      {singleChild}
    </span>
  );
}

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly showBG?: boolean;
  readonly onClick?: (
    value: string | number | undefined,
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  readonly onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  readonly value?: string;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark"];
