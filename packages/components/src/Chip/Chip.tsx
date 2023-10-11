import React from "react";
import classNames from "classnames";
import styles from "./Chip.css";
import { ChipPrefix } from "./components/ChipPrefix/Chip.Prefix";
import { ChipSuffix } from "./components/ChipSuffix/Chip.Suffix";
import { ChipProps } from "./Chip.types";
import { useChildComponent } from "../hooks/useChildComponent";
import { Typography } from "../Typography";

export const Chip = ({
  ariaLabel,
  disabled,
  heading,
  invalid,
  label,
  value,
  onClick,
  onKeyDown,
  children,
  role = "button",
  tabIndex = 0,
  variation = "base",
}: ChipProps): JSX.Element => {
  const classes = classNames(styles.chip, {
    [styles.invalid]: invalid,
    [styles.base]: variation === "base",
    [styles.subtle]: variation === "subtle",
    [styles.disabled]: disabled,
  });

  const prefix = useChildComponent(children, d => d.type === Chip.Prefix);
  const suffix = useChildComponent(children, d => d.type === Chip.Suffix);

  return (
    <button
      className={classes}
      onClick={ev => onClick && onClick(value || label, ev)}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel || label}
      disabled={disabled}
      role={role}
      type="button"
    >
      {prefix}
      <Typography size="base" fontWeight="medium">
        {heading}
      </Typography>
      {heading && <span className={styles.chipBar}></span>}
      <span>
        <Typography size="base">{label}</Typography>
      </span>
      {suffix}
    </button>
  );
};

Chip.Prefix = ChipPrefix;
Chip.Suffix = ChipSuffix;
