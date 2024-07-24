import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({
  children,
  className,
  onClick: onClickSuffix,
  testID,
  ariaLabel,
}: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onClickSuffix?.(event);
  };

  const isClickable = Boolean(onClickSuffix);

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }

  const tagProps = {
    className: classNames(
      isClickable ? styles.clickableSuffix : styles.suffix,
      className,
      !singleChild && styles.empty,
    ),
    onClick: isClickable ? handleClick : undefined,
    type: isClickable ? ("button" as const) : undefined,
    "data-testid": testID,
    "aria-label": ariaLabel,
  };

  const Tag = onClickSuffix ? "button" : "span";

  return <Tag {...tagProps}>{singleChild}</Tag>;
}

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly testID?: string;
  readonly ariaLabel?: string;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark", "arrowDown"];
