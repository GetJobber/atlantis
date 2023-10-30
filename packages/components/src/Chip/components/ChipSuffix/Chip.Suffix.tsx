import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly showBackground?: boolean;
  readonly onClick?: (
    value: string | number | undefined,
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  readonly onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  readonly value?: string;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark"];

export function ChipSuffix({
  children,
  className,
  showBackground,
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
    showBackground,
    {
      [styles.clickableSuffix]: onClick,
    },
  );

  return (
    <span
      data-testid="ATL-Chip-Suffix"
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
