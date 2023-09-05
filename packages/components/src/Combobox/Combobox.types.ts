import { ButtonProps } from "../Button";

export interface TriggerProps {
  /**
   * The label text of the trigger.
   */
  readonly label: string;
}

export interface TriggerButtonProps
  extends TriggerProps,
    Pick<ButtonProps, "type" | "variation" | "icon" | "iconOnRight"> {}

export type TriggerChipProps = TriggerProps;
