import React, { ReactElement } from "react";
import classnames from "classnames";
import { IconColorNames } from "@jobber/design";
import styles from "./Chip.css";
import { ChipAvatar, ChipAvatarProps } from "./ChipAvatar";
import { ChipIcon, ChipIconProps } from "./ChipIcon";
import { useAssert } from "./useAssert";
import { Typography } from "../Typography";

interface ChipProps {
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
   * Highlights the chip red.
   */
  readonly invalid?: boolean;

  /**
   * Adds an avatar or icon on the left side of the label.
   *
   * **Example**
   *```jsx
   * <Chip prefix={<ChipAvatar initials="JBR" />} />
   * <Chip prefix={<ChipIcon name="quote" />} />
   * ```
   */
  readonly prefix?: ReactElement<ChipAvatarProps> | ReactElement<ChipIconProps>;

  /**
   * Callback when the chip itself gets clicked.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function Chip({
  label,
  active = false,
  disabled = false,
  invalid = false,
  prefix,
  onClick,
}: ChipProps) {
  const component = computedProps();
  useAssert(
    !!prefix && !(component.isPrefixAvatar || component.isPrefixIcon),
    `Prefix prop only accepts "<ChipAvatar />" or "<ChipIcon />" component. You have "${prefix?.type}"`,
  );

  const className = classnames(styles.chip, {
    [styles.clickable]: component.isClickable,
    [styles.active]: active,
    [styles.disabled]: disabled,
    [styles.invalid]: invalid,
    [styles.hasPrefix]: prefix,
  });

  return (
    <div
      className={className}
      tabIndex={0}
      aria-disabled={disabled}
      {...clickableProps()}
    >
      {renderPrefix()}
      <Typography element="span" size="base">
        {label}
      </Typography>
    </div>
  );

  function clickableProps() {
    if (component.isClickable) {
      return { onClick: onClick, role: "button" };
    }
    return;
  }

  function computedProps() {
    return {
      isPrefixAvatar: prefix?.type === ChipAvatar || false,
      isPrefixIcon: prefix?.type === ChipIcon || false,
      isClickable: onClick && !disabled,
    };
  }

  function renderPrefix() {
    if (component.isPrefixIcon) {
      let color: IconColorNames | undefined;
      active && (color = "white");
      invalid && !disabled && (color = "criticalOnSurface");
      disabled && !active && (color = "disabled");

      return React.cloneElement(prefix as ReactElement<ChipIconProps>, {
        color: color,
      });
    }

    return prefix;
  }
}
