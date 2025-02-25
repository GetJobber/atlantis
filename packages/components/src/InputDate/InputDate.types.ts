import { CommonFormFieldProps, FormFieldProps } from "../FormField";
import { InputTextRebuiltProps } from "../InputText/InputText.types";

export interface InputDateRebuiltProps
  extends Omit<
    InputTextRebuiltProps,
    | "clearable"
    | "onChange"
    | "value"
    | "prefix"
    | "suffix"
    | "multiline"
    | "rows"
    | "type"
    | "version"
  > {
  /**
   * A Date object value
   * (e.g., `new Date("11/11/2011")`)
   * */
  readonly value?: Date;
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

  /**
   * Version 2 is highly experimental, avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;

  readonly onChange: (
    newValue: Date,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

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
      | "id"
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
