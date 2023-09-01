import { ButtonProps } from "../../../Button";

export interface TriggerProps extends Pick<ButtonProps, "type" | "variation"> {
  /**
   * Trigger label
   */
  readonly label: string;
}
