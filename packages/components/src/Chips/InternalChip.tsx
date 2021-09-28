import React, { ReactElement, useState } from "react";
import classnames from "classnames";
import { IconColorNames } from "@jobber/design";
import styles from "./InternalChip.css";
import { ChipAvatar, ChipAvatarProps } from "./ChipAvatar";
import { ChipIcon, ChipIconProps } from "./ChipIcon";
import { useAssert } from "./useAssert";
import { ChipButtonProps, InternalChipButton } from "./InternalChipButton";
import { Typography } from "../Typography";
import { Tooltip } from "../Tooltip";

export interface InternalChipProps {
  /**
   * Label of the chip.
   */
  readonly label: string;

  /**
   * Throws a console warning when the chip label goes over 24 characters.
   */
  readonly warnOnLongLabels?: boolean;

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
  readonly prefix?: ReactElement<ChipAvatarProps | ChipIconProps>;

  /**
   * Adds a component on the right side of the label.
   */
  readonly suffix?: ReactElement<ChipIconProps | ChipButtonProps>;

  /**
   * Callback when the chip itself gets clicked.
   */
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export function InternalChip({
  label,
  active = false,
  disabled = false,
  invalid = false,
  prefix,
  suffix,
  warnOnLongLabels = false,
  onClick,
}: InternalChipProps) {
  assertProps();
  const [truncateRef, setTruncateRef] = useState<HTMLElement | null>();
  const Tag = onClick ? "button" : "div";
  const chip = (
    <Tag
      className={classnames(styles.chip, {
        [styles.clickable]: computed().isClickable,
        [styles.active]: active,
        [styles.disabled]: disabled,
        [styles.invalid]: invalid,
        [styles.hasPrefix]: prefix,
        [styles.hasSuffix]: suffix,
      })}
      data-testid="chip-wrapper"
      {...(computed().isClickable && {
        onClick: onClick,
        disabled: disabled,
      })}
    >
      {renderPrefix()}
      <Typography numberOfLines={1} size="base">
        <span ref={setTruncateRef}>{label}</span>
      </Typography>
      {renderSuffix()}
    </Tag>
  );

  return isTruncated() ? <Tooltip message={label}>{chip}</Tooltip> : chip;

  function isTruncated() {
    const truncateParentHeight = truncateRef?.parentElement?.offsetHeight || 0;
    const truncateChildHeight = truncateRef?.offsetHeight || 0;
    return truncateParentHeight < truncateChildHeight;
  }

  function computed() {
    return {
      isPrefixAvatar: prefix?.type === ChipAvatar || false,
      isPrefixIcon: prefix?.type === ChipIcon || false,
      isSuffixIcon: suffix?.type === ChipIcon || false,
      isSuffixButton: suffix?.type === InternalChipButton || false,
      isClickable: onClick && !disabled,
    };
  }

  function renderPrefix() {
    if (computed().isPrefixIcon) {
      return recolorChipIcon(prefix as ReactElement<ChipIconProps>);
    }
    return prefix;
  }

  function renderSuffix() {
    if (computed().isSuffixIcon) {
      return recolorChipIcon(suffix as ReactElement<ChipIconProps>);
    }
    return suffix;
  }

  function recolorChipIcon(icon: ReactElement<ChipIconProps>) {
    let color: IconColorNames | undefined;
    active && (color = "white");
    invalid && !disabled && (color = "criticalOnSurface");
    disabled && !active && (color = "disabled");

    return (
      <div className={styles.icon}>
        {React.cloneElement(icon, { ...(color && { color: color }) })}
      </div>
    );
  }

  function assertProps() {
    useAssert(
      !!prefix && !(computed().isPrefixAvatar || computed().isPrefixIcon),
      `Prefix prop only accepts "<ChipAvatar />" or "<ChipIcon />" component. You have "${prefix?.type}".`,
    );
    useAssert(
      !!suffix && !(computed().isSuffixIcon || computed().isSuffixButton),
      `Prefix prop only accepts "<ChipIcon />" component. You have "${suffix?.type}".`,
    );
    useAssert(
      warnOnLongLabels && label.length > 24,
      `"${label}" label is too long for a Chip; you might be better off using Checkbox or Radio. ${label.length}/24 characters.`,
      { warn: true },
    );
  }
}
