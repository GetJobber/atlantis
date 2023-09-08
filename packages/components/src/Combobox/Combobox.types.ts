import { ButtonProps } from "../Button";

export interface ComboboxTriggerProps {
  /**
   * The label text of the trigger.
   */
  readonly label: string;
}

export interface ComboboxTriggerButtonProps
  extends ComboboxTriggerProps,
    Pick<ButtonProps, "type" | "variation" | "icon" | "iconOnRight"> {}

export type ComboboxTriggerChipProps = ComboboxTriggerProps;

export interface ComboboxOption {
  id: string | number;
  label: string;
}
