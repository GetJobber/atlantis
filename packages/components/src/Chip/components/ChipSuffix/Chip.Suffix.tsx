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

  const tagProps = {
    className: classNames(
      onClick ? styles.clickableSuffix : styles.suffix,
      className,
      !singleChild && styles.empty,
    ),
    onClick: handleClick,
    onKeyPress: handleClick,
    ...(onClick ? { role: "button" } : {}),
    ...(onClick ? { tabIndex: 0 } : {}),
    "data-testid": testID,
    "aria-label": ariaLabel,
  };

  return <span {...tagProps}>{singleChild}</span>;
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
