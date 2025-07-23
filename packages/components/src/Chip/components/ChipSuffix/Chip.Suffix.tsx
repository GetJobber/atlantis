import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { InternalChipButton } from "@jobber/components/Chips/InternalChipButton";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.module.css";

export function ChipSuffix({
  children,
  className,
  onClick,
  testID,
  ariaLabel,
}: ChipSuffixProps) {
  const singleChild = useChildComponent(
    children,
    d => d.type === Icon || d.type == InternalChipButton,
  );

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
