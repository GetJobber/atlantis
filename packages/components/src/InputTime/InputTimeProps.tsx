import { CivilTime } from "@std-proposal/temporal";
import { BaseFormFieldProps, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */

interface BaseProps
  extends BaseFormFieldProps,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
    > {}

export interface InputTimeProps extends BaseProps {
  /**
   * Intial value of the input. Only use this when you need to prepopulate the
   * field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: CivilTime;
  /**
   * Set the component to the given value.
   */
  readonly value?: CivilTime;
  /**
   * Function called when user changes input value.
   */
  onChange?(newValue?: CivilTime): void;
}
