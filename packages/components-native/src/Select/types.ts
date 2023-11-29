import { ReactNode } from "react";

export interface SelectInternalPickerProps {
  /**
   * Tapping the children opens the picker
   */
  readonly children: ReactNode;

  /**
   * The list of options that user can choose from
   */
  readonly options: SelectInternalPickerOption[];

  /**
   * Prevents the menu from opening
   */
  readonly disabled?: boolean;

  /**
   * Callback to fire when an option is pressed
   */
  readonly onChange: (value: string) => void;
}

export interface SelectInternalPickerOption {
  /**
   * The value that gets returned whenever the option is selected
   */
  readonly value: string;

  /**
   * What the user chooses on the UI
   */
  readonly label: string;

  /**
   * Determines if the option is selected or not
   */
  readonly isActive?: boolean;
}

export interface SelectOnOptionPressEvent {
  readonly nativeEvent: {
    readonly event: string;
  };
}
