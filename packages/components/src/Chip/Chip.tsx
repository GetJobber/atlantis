import React from "react";
import classnames from "classnames";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./Chip.css";
import { ChipPrefix } from "./components/ChipPrefix/Chip.Prefix";
import { ChipSuffix } from "./components/ChipSuffix/Chip.Suffix";
import { ChipProps } from "./Chip.types.d";
import { useChildComponent } from "./hooks/useChildComponent";
import { Typography } from "../Typography";
import { Tooltip } from "../Tooltip";

export const Chip = ({
  ariaLabel,
  dataTestID,
  disabled,
  heading,
  invalid,
  label,
  mode = "button",
  value,
  onClick,
  onKeyDown,
  children,
  role = "button",
  tabIndex = 0,
  variation = "base",
}: ChipProps): JSX.Element => {
  const classes = classnames(styles.chip, {
    [styles.useDiv]: mode === "form",
    [styles.invalid]: invalid,
    [styles.base]: variation === "base",
    [styles.subtle]: variation === "subtle",
    [styles.disabled]: disabled,
  });

  const prefix = useChildComponent(children, d => d.type === Chip.Prefix);
  const suffix = useChildComponent(children, d => d.type === Chip.Suffix);
  const Tag = mode === "form" && !disabled ? "div" : "button";

  const [labelRef, labelFullyVisible] = useInView<HTMLSpanElement>();
  const [headingRef, headingFullyVisible] = useInView<HTMLSpanElement>();
  const tooltipMessage = getTooltipMessage(
    labelFullyVisible,
    headingFullyVisible,
    label,
    heading,
  );

  return (
    <Tooltip message={tooltipMessage}>
      <Tag
        className={classes}
        onClick={(ev: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
          mode === "button" &&
          onClick?.(value || label, ev as React.MouseEvent<HTMLButtonElement>)
        }
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel || label}
        disabled={disabled}
        role={role}
        type="button"
        data-testid={dataTestID || "chip-wrapper"}
      >
        {prefix}
        <div className={styles.chipContent}>
          {heading && (
            <>
              <Typography size="base" fontWeight="medium">
                {heading}
                <span ref={headingRef} />
              </Typography>
              {label && <span className={styles.chipBar} />}
            </>
          )}
          <Typography size="base">
            {label}
            <span ref={labelRef} />
          </Typography>
          {!labelFullyVisible && (
            <div
              className={styles.truncateGradient}
              data-testid="ATL-Chip-Truncation-Gradient"
            />
          )}
        </div>
        {suffix}
      </Tag>
    </Tooltip>
  );
};

function getTooltipMessage(
  labelFullyVisible: boolean,
  headingFullyVisible: boolean,
  label: string,
  heading?: string,
): string {
  let message = "";

  if (heading && !headingFullyVisible) {
    message = `${heading} | ${label}`;
  } else if (!labelFullyVisible) {
    message = label;
  }

  return message;
}

Chip.Prefix = ChipPrefix;
Chip.Suffix = ChipSuffix;
