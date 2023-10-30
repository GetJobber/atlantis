import React, { PropsWithChildren } from "react";

export interface ChipProps extends PropsWithChildren {
  /**
   * If you need Chip to be part of a form element, this makes it not a button, but just a div so you can wrap it in a label.
   */
  readonly actAsFormElement?: boolean;

  /**
   * Accessible label, which can be different from the primary label.
   */
  readonly ariaLabel?: string;

  /**
   * Enables pass through of a data-testid, used to locate this view in e2e tests.
   */
  readonly dataTestID?: string;

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
