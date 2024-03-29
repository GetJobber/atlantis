import React from "react";
import classnames from "classnames";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./Chip.css";
import { ChipPrefix } from "./components/ChipPrefix/Chip.Prefix";
import { ChipSuffix } from "./components/ChipSuffix/Chip.Suffix";
import { ChipProps } from "./Chip.types";
import { useChildComponent } from "./hooks/useChildComponent";
import { Typography } from "../Typography";
import { Tooltip } from "../Tooltip";

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
  const classes = classnames(styles.chip, {
    [styles.invalid]: invalid,
    [styles.base]: variation === "base",
    [styles.subtle]: variation === "subtle",
    [styles.disabled]: disabled,
  });

  const prefix = useChildComponent(children, d => d.type === Chip.Prefix);
  const suffix = useChildComponent(children, d => d.type === Chip.Suffix);

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
      <button
        className={classes}
        onClick={(ev: React.MouseEvent<HTMLButtonElement>) =>
          onClick && onClick(value, ev)
        }
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel || label}
        disabled={disabled}
        role={role}
        type="button"
      >
        {prefix}
        <div className={styles.chipContent}>
          {heading && (
            <>
              <Typography size="base" fontWeight="medium">
                {heading}
                <span ref={headingRef} className={styles.chipLabelRef} />
              </Typography>
              {label && <span className={styles.chipBar} />}
            </>
          )}
          <Typography size="base">
            {label}
            <span ref={labelRef} className={styles.chipLabelRef} />
          </Typography>
          {!labelFullyVisible && (
            <div
              className={styles.truncateGradient}
              data-testid="ATL-Chip-Truncation-Gradient"
            />
          )}
        </div>
        {suffix}
      </button>
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
