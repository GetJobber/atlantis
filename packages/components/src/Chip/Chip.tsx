import React, { ReactElement } from "react";
import classnames from "classnames";
import styles from "./Chip.css";
import { ChipAvatar, ChipAvatarProps } from "./ChipAvatar";
import { Typography } from "../Typography";

interface ChipProps {
  readonly avatar?: ReactElement<ChipAvatarProps>;
  /**
   * Label of the chip.
   */
  readonly label: string;

  /**
   * Changes the style of the chip to look different than the default.
   */
  readonly active?: boolean;

  /**
   * Makes the chip look and feels uninteractable.
   */
  readonly disabled?: boolean;

  /**
   * Callback when the chip itself gets clicked.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function Chip({
  avatar,
  label,
  active = false,
  disabled = false,
  onClick,
}: ChipProps) {
  console.log(avatar?.type);
  if (avatar && avatar.type !== ChipAvatar) {
    throw new Error("`avatar` prop only accepts `<ChipAvatar />` component");
  }

  const isClickable = onClick && !disabled;
  const className = classnames(styles.chip, {
    [styles.clickable]: isClickable,
    [styles.active]: active,
    [styles.disabled]: disabled,
    [styles.hasPrefix]: avatar,
  });

  const props = {
    className: className,
    tabindex: 0,
    ...(isClickable && {
      onClick: onClick,
      role: "button",
    }),
    "aria-disabled": disabled,
  };

  return (
    <div {...props}>
      {avatar}
      <Typography element="span" size="base">
        {label}
      </Typography>
    </div>
  );
}
