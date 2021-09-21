import React, { ReactElement } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Chip.css";
import { ChipAvatar, ChipAvatarProps } from "./ChipAvatar";
import { ChipIcon, ChipIconProps } from "./ChipIcon";
import { useAssert } from "./useAssert";
import { Typography } from "../Typography";

interface ChipBaseProps {
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

interface ChipWithAvatarProps extends ChipBaseProps {
  /**
   * Adds a small avatar on the left side of the label.
   * **Note: You can only add either an avatar or icon but not both.**
   *
   * **Example**
   * ```
   * <Chip avatar={<ChipAvatar initials="JBBR" />} />
   * ```
   */
  readonly avatar?: ReactElement<ChipAvatarProps>;
}

interface ChipWithIconProps extends ChipBaseProps {
  /**
   * Adds an icon on the left side of the label.
   * **Note: You can only add either an avatar or icon but not both.**
   *
   * **Example**
   * ```
   * <Chip avatar={<ChipIcon name="quote" />} />
   * ```
   */
  readonly icon?: ReactElement<ChipIconProps>;
}

type ChipProps = XOR<ChipWithAvatarProps, ChipWithIconProps>;

export function Chip({
  avatar,
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
}: ChipProps) {
  assertProps();
  const isClickable = onClick && !disabled;
  const className = classnames(styles.chip, {
    [styles.clickable]: isClickable,
    [styles.active]: active,
    [styles.disabled]: disabled,
    [styles.hasPrefix]: avatar || icon,
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
      {icon && active ? React.cloneElement(icon, { color: "white" }) : icon}
      {avatar}
      <Typography element="span" size="base">
        {label}
      </Typography>
    </div>
  );

  function assertProps() {
    useAssert(
      !!avatar && avatar.type !== ChipAvatar,
      "`avatar` prop only accepts `<ChipAvatar />` component",
    );
    useAssert(
      !!icon && icon.type !== ChipIcon,
      "`icon` prop only accepts `<ChipIconProps />` component",
    );
  }
}
