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

// Define a type for the Chip component with the properties we add to it
type ChipComponent = React.ForwardRefExoticComponent<
  ChipProps & React.RefAttributes<HTMLButtonElement | HTMLDivElement>
> & {
  Prefix: typeof ChipPrefix;
  Suffix: typeof ChipSuffix;
  displayName: string;
};

export const Chip = React.forwardRef<
  HTMLButtonElement | HTMLDivElement,
  ChipProps
>(
  (
    {
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
    },
    ref,
  ) => {
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

    const chipContent = (
      <>
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
      </>
    );

    // Use createElement to properly handle the ref typing
    return (
      <Tooltip message={tooltipMessage} setTabIndex={false}>
        {onClick
          ? React.createElement(
              "button",
              {
                className: classes,
                onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
                  onClick?.(value, ev),
                tabIndex: disabled ? -1 : tabIndex,
                onKeyDown,
                "aria-label": ariaLabel,
                disabled,
                role,
                "data-testid": testID,
                type: "button",
                ref,
              },
              chipContent,
            )
          : React.createElement(
              "div",
              {
                className: classes,
                tabIndex: disabled ? -1 : tabIndex,
                onKeyDown,
                "aria-label": ariaLabel,
                role,
                "data-testid": testID,
                ref,
              },
              chipContent,
            )}
      </Tooltip>
    );
  },
) as ChipComponent;

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
Chip.displayName = "Chip";
