import { ReactElement } from "react";
import { XOR } from "ts-xor";

export interface BaseCheckboxProps {
  /**
   * Determines if the checkbox is checked or not.
   */
  readonly checked?: boolean;

  /**
   * Initial checked value of the checkbox. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
  readonly defaultChecked?: boolean;

  /**
   * Disables the checkbox.
   */
  readonly disabled?: boolean;

  /**
   * When `true` the checkbox to appears in indeterminate.
   *
   * @default false
   */
  readonly indeterminate?: boolean;

  /**
   * Checkbox input name
   */
  readonly name?: string;

  /**
   * Value of the checkbox.
   */
  readonly value?: string;

  /**
   * Further description of the label
   */
  readonly description?: string;

  /**
   * ID for the checkbox input
   */
  readonly id?: string;

  onChange?(newValue: boolean): void;

  onFocus?(): void;

  onBlur?(): void;
}

interface CheckboxLabelProps extends BaseCheckboxProps {
  /**
   * Label that shows up beside the checkbox.
   */
  readonly label?: string;
}

interface CheckboxChildrenProps extends BaseCheckboxProps {
  /**
   * Component children, which shows up as a label
   */
  readonly children?: ReactElement;
}

export type CheckboxRebuiltProps = Omit<
  BaseCheckboxProps,
  "label" | "description" | "children"
> & {
  label?: string | ReactElement;
  description?: string | ReactElement;
  version: 2;
};

export type CheckboxProps = XOR<CheckboxLabelProps, CheckboxChildrenProps> & {
  version?: 1;
};
