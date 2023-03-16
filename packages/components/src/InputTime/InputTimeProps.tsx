import { CivilTime } from "@std-proposal/temporal";
import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export interface InputTimeProps
  extends Pick<
      CommonFormFieldProps,
      | "align"
      | "description"
      | "disabled"
      | "invalid"
      | "inline"
      | "loading"
      | "name"
      | "onValidation"
      | "placeholder"
      | "size"
    >,
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
    > {
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
