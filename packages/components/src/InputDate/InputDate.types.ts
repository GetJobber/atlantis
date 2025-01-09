import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export interface InputDateProps
  extends Omit<CommonFormFieldProps, "clearable">,
    Pick<
      FormFieldProps,
      | "readonly"
      | "disabled"
      | "onEnter"
      | "onFocus"
      | "inputRef"
      | "validations"
      | "placeholder"
      | "onChange"
      | "onBlur"
    > {
  /**
   * A Date object value
   * (e.g., `new Date("11/11/2011")`)
   * */
  readonly value?: Date;
  onChange(newValue: Date): void;
  /**
   * The maximum selectable date.
   */
  readonly maxDate?: Date;

  /**
   * The minimum selectable date.
   */
  readonly minDate?: Date;

  /**
   * Whether to show the calendar icon
   * @default true
   */
  readonly showIcon?: boolean;

  /**
   * Text to display instead of a date value
   */
  readonly emptyValueLabel?: string;
}
