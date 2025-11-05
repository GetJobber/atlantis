import type {
  CommonFormFieldProps,
  FocusEvents,
  FormFieldProps,
  HTMLInputBaseProps,
  KeyboardEvents,
  RebuiltInputCommonProps,
} from "../FormField";

export type InputEmailLegacyProps = CommonFormFieldProps &
  Pick<
    FormFieldProps,
    "maxLength" | "readonly" | "validations" | "defaultValue"
  >;

export const validationMessage = "Please enter a valid email";

export type InputEmailVersion = 1 | 2 | undefined;

/**
 * Experimental version 2 of the InputEmail component.
 * Do not use unless you have talked with Atlantis first.
 */
export interface InputEmailRebuiltProps
  extends HTMLInputBaseProps,
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
    RebuiltInputCommonProps {
  /**
   * The current value of the input.
   */
  readonly value?: string;

  /**
   * Custom onChange handler that provides the new value as the first argument.
   */
  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * A callback to handle "Enter" keypress. This will only run
   * if Enter is the only key. Will not run if Shift or Control
   * are being held.
   */
  readonly onEnter?: FormFieldProps["onEnter"];

  /**
   * @deprecated Use `id` instead. This prop will be removed in a future version.
   */
  readonly identifier?: string;

  /**
   * @deprecated Use `autoComplete` with string values instead. This prop will be removed in a future version.
   */
  readonly autocomplete?: never;

  /**
   * @deprecated Use `aria-label` instead. This prop will be removed in a future version.
   */
  readonly ariaLabel?: never;

  /**
   * @deprecated Use `readOnly` instead. This prop will be removed in a future version.
   */
  readonly readonly?: never;
}
