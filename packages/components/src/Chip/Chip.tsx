import React from "react";
import classNames from "classnames";
import styles from "./Chip.css";
import { ChipPrefix } from "./components/ChipPrefix/Chip.Prefix";
import { ChipSuffix } from "./components/ChipSuffix/Chip.Suffix";
import { ChipProps } from "./Chip.types.d";
import { useChildComponent } from "./hooks/useChildComponent";
import { Typography } from "../Typography";

export const Chip = ({
  actAsFormElement = false,
  ariaLabel,
  dataTestID,
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
    [styles.actingAsDiv]: actAsFormElement,
    [styles.invalid]: invalid,
    [styles.base]: variation === "base",
    [styles.subtle]: variation === "subtle",
    [styles.disabled]: disabled,
  });

  const prefix = useChildComponent(children, d => d.type === Chip.Prefix);
  const suffix = useChildComponent(children, d => d.type === Chip.Suffix);
  const Tag = actAsFormElement ? "div" : "button";

  return (
    <Tag
      className={classes}
      onClick={(ev: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
        onClick &&
        !actAsFormElement &&
        onClick(value || label, ev as React.MouseEvent<HTMLButtonElement>)
      }
      tabIndex={tabIndex}
      onKeyDown={(
        ev: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>,
      ) => onKeyDown && onKeyDown(ev as React.KeyboardEvent<HTMLButtonElement>)}
      aria-label={ariaLabel || label}
      disabled={disabled}
      role={role}
      type="button"
      data-testid={dataTestID || "chip-wrapper"}
    >
      {prefix}
      <Typography size="base" fontWeight="medium">
        {heading}
      </Typography>
      {heading && <span className={styles.chipBar} />}
      <Typography size="base">{label}</Typography>
      {suffix}
    </Tag>
  );
};

Chip.Prefix = ChipPrefix;
Chip.Suffix = ChipSuffix;
