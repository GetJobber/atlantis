import React from "react";
import { useInView } from "@jobber/hooks/useInView";
import { Typography } from "@jobber/components/Typography";
import styles from "./CustomChip.css";

export interface ChipProps {
  /**
   * Accessible label, which can be different from the primary label.
   */
  readonly ariaLabel?: string;

  readonly ariaControls?: string;

  readonly ariaExpanded?: boolean;

  /**
   * Disables both mouse and keyboard functionality, and updates the visual style of the Chip to appear disabled.
   */
  readonly disabled?: boolean;

  /**
   * Adds more prominent text to act as a heading. Will be displayed on the left with a | separator.
   */
  readonly heading?: string;

  /**
   * Changes Chip styling to inform the user of an issue.
   */
  readonly invalid?: boolean;

  /**
   * The content of the chip. Will be displayed on the right if you include a heading.
   */
  readonly label: string;

  /**
   * The accessible role the Chip is fulfilling. Defaults to 'button'
   */
  readonly role?: string;

  /**
   * Used for accessibility purpopses, specifically using the tab key as navigation.
   * @default 0
   */
  readonly tabIndex?: number;

  /**
   * Will be passed to onClick, when the user clicks on this Chip.
   */
  readonly value?: string | number;

  /**
   * Button style variation. Does not affect functionality.
   * @default "base"
   */
  readonly variation?: ChipVariations;

  /**
   * Chip Click Callback. Sends an event and sometimes a value (SelectableChip).
   */
  readonly onClick?: (
    value: string | number | undefined,
    ev: React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /**
   * Callback. Called when you keydown on Chip. Ships the event, so you can get the key pushed.
   */
  readonly onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;

  readonly children: React.ReactElement;
}

export type ChipVariations = "subtle" | "base";
export interface ChipSelectableProps extends ChipProps {
  /**
   * Is Chip selected?
   */
  readonly selected?: boolean;

  /**
   * Send this back onClick. Good for determining which Chip was clicked.
   */
  readonly value?: string | number;
}

export const CustomChip = ({
  ariaLabel,
  disabled,
  label,
  value,
  onClick,
  onKeyDown,
  children,
  ariaControls,
  ariaExpanded,
  role = "button",
  tabIndex = 0,
}: ChipProps): JSX.Element => {
  const [labelRef, labelFullyVisible] = useInView<HTMLSpanElement>();

  return (
    <button
      className={[styles.chip, styles.base].join(" ")}
      onClick={(ev: React.MouseEvent<HTMLButtonElement>) =>
        onClick && onClick(value, ev)
      }
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel || label}
      disabled={disabled}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      role={role}
      type="button"
    >
      <div className={styles.chipContent}>
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
        {children}
      </div>
    </button>
  );
};
