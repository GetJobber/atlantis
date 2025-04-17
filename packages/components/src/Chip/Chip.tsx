import React from "react";
import classnames from "classnames";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./Chip.module.css";
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
  testID,
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
  const Tag = onClick ? "button" : "div";

  return (
    <Tooltip message={tooltipMessage} setTabIndex={false}>
      <Tag
        className={classes}
        onClick={(ev: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
          onClick?.(value, ev)
        }
        tabIndex={disabled ? -1 : tabIndex}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        disabled={disabled}
        role={role}
        data-testid={testID}
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
            >
              <span />
            </div>
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
