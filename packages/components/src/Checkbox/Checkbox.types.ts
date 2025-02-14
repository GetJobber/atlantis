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

  /**
   * Called when the checkbox value changes
   */
  onChange?(newValue: boolean): void;

  /**
   * Called when the checkbox is focused
   */
  onFocus?(): void;

  /**
   * Called when the checkbox loses focus
   */
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
  /**
   * Label that shows up beside the checkbox.
   * String will be rendered with the default markup.
   * ReactElement will be rendered with provided positionining.
   */
  label?: string | ReactElement;

  /**
   * Additional description of the checkbox.
   * String will be rendered with the default markup.
   * ReactElement will be rendered with provided positioning.
   */
  description?: string | ReactElement;

  /**
   * Version 2 is highly experimental, avoid using it unless you have talked with Atlantis first.
   */
  version: 2;
};

export type CheckboxLegacyProps = XOR<
  CheckboxLabelProps,
  CheckboxChildrenProps
> & {
  version?: 1;
};
