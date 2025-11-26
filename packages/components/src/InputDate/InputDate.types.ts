import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type {
  FocusEvents,
  HTMLInputBaseProps,
  KeyboardEvents,
  RebuiltInputCommonProps,
} from "../sharedHelpers/types";

export interface InputDateRebuiltProps
  extends HTMLInputBaseProps,
    FocusEvents<HTMLInputElement | HTMLTextAreaElement>,
    KeyboardEvents<HTMLInputElement | HTMLTextAreaElement>,
    Omit<RebuiltInputCommonProps, "clearable" | "prefix" | "suffix"> {
  /**
   * A Date object value
   * (e.g., `new Date("11/11/2011")`)
   * */
  readonly value?: Date;

  /**
   * Callback for value changes.
   * @param newValue - The new Date value
   * @param event - Optional change event
   */
  readonly onChange: (
    newValue: Date,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * @deprecated Use `onKeyDown` or `onKeyUp` instead.
   */
  readonly onEnter?: FormFieldProps["onEnter"];

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
