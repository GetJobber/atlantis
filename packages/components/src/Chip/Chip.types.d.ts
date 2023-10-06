import React, { PropsWithChildren } from "react";

export interface ChipProps extends PropsWithChildren {
  /** Accessible Label */
  ariaLabel?: string;
  /** Disables Chip */
  disabled?: boolean;
  /** Adds more prominent text to act as a heading */
  heading?: string;
  /** Changes Chip styling to inform the user of an issue. */
  invalid?: boolean;
  /** What do you want Chip to say? */
  label: string;
  /** What role does Chip play? */
  role?: string;
  /** Defaults to zero. Accessible feature. */
  tabIndex?: number;
  /** Defaults to base. Changes style of button */
  variation?: "subtle" | "base";
  /** Chip Click Callback. Sends an event and sometimes a value (SelectableChip).  */
  onClick?: (
    ev: React.MouseEvent<HTMLButtonElement>,
    value?: string | number,
  ) => void;
  /**  Callback. Called when you keydown on Chip. Ships the event, so you can get the key pushed.  */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export interface ChipSelectableProps extends ChipProps {
  /** Is Chip selected? */
  selected?: boolean;
  /** Send this back onClick. Good for determining which Chip was clicked. */
  value?: string | number;
}
