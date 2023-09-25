import React, { useState } from "react";
import classnames from "classnames";
import styles from "./InternalChip.css";
import { InternalChipProps } from "./ChipTypes";
import { InternalChipAffix } from "./InternalChipAffix";
import { Typography } from "../Typography";
import { Tooltip } from "../Tooltip";
import { Icon } from "../Icon";

export function InternalChip({
  label,
  active = false,
  disabled = false,
  invalid = false,
  prefix,
  suffix,
  tabIndex,
  ariaLabel,
  onClick,
  onKeyDown,
}: InternalChipProps) {
  const [truncateRef, setTruncateRef] = useState<HTMLElement | null>();
  const isClickable = onClick && !disabled;
  const classNames = classnames(styles.chip, {
    [styles.clickable]: isClickable,
    [styles.active]: active,
    [styles.disabled]: disabled,
    [styles.invalid]: invalid,
    [styles.hasPrefix]: prefix,
    [styles.hasSuffix]: suffix,
  });
  const affixProps = { active, invalid, disabled };
  const Tag = onClick ? "button" : "div";

  const chip = (
    <Tag
      className={classNames}
      {...(isClickable && { onClick, disabled })}
      onKeyDown={onKeyDown}
      data-testid="chip-wrapper"
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      role={tabIndex !== undefined ? "option" : undefined}
    >
      <InternalChipAffix affix={prefix} {...affixProps} />
      <Typography element="span" numberOfLines={1} size="base">
        <span ref={setTruncateRef}>{label}</span>
      </Typography>
      <InternalChipAffix affix={suffix} {...affixProps} />
      <div className={styles.activeIndicator}>
        <Icon name="checkmark" color="heading" size="small"></Icon>
      </div>
    </Tag>
  );

  return isTruncated() ? <Tooltip message={label}>{chip}</Tooltip> : chip;

  function isTruncated() {
    const truncateParentHeight = truncateRef?.parentElement?.offsetHeight || 0;
    const truncateChildHeight = truncateRef?.offsetHeight || 0;
    return truncateChildHeight >= truncateParentHeight * 2;
  }
}
