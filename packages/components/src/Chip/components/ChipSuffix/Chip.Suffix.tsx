import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({
  children,
  className,
  onClick,
  testID,
  ariaLabel,
}: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
      | React.KeyboardEvent<HTMLSpanElement>,
  ) => {
    if (!onClick) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    onClick(event);
  };

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }

  return (
    <span
      className={classNames(
        onClick ? styles.clickableSuffix : styles.suffix,
        className,
        !singleChild && styles.empty,
      )}
      onClick={handleClick}
      onKeyPress={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-testid={testID}
      aria-label={ariaLabel}
    >
      {singleChild}
    </span>
  );
}

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly testID?: string;
  readonly ariaLabel?: string;
  readonly onClick?: (
    event:
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
      | React.KeyboardEvent<HTMLSpanElement>,
  ) => void;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark", "arrowDown"];
