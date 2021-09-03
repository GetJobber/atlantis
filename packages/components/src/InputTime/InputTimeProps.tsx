import { CivilTime } from "@std-proposal/temporal";
import { BaseFormFieldProps, FormFieldProps } from "../FormField";

type BaseProps = Omit<
  BaseFormFieldProps,
  "onChange" | "value" | "defaultValue"
>;

interface BaseInputTimeProps
  extends BaseProps,
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

export interface InputTimeProps extends BaseInputTimeProps {
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
