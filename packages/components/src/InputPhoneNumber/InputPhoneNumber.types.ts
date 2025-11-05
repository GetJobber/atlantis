import type { InputMaskProps } from "./InputMask";
import type {
  CommonFormFieldProps,
  FormFieldProps,
  HTMLInputBaseProps,
  RebuiltInputCommonProps,
} from "../FormField";

export interface InputPhoneNumberLegacyProps
  extends Omit<CommonFormFieldProps, "align">,
    Pick<
      FormFieldProps,
      | "autocomplete"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "validations"
      | "readonly"
      | "prefix"
      | "suffix"
    > {
  readonly value: string;
  readonly onChange: (value: string) => void;

  /**
   * A pattern to specify the format to display the phone number in.
   * For example if you want to display the format for [Denmark](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers#Denmark)
   * you could set it to `** ** ** **`
   * @default "(***) ***-****"
   */
  readonly pattern?: InputMaskProps["pattern"];

  /**
   * Shows a "required" validation message when the component is left empty.
   */
  readonly required?: boolean;
}

export interface InputPhoneNumberRebuiltProps
  extends Omit<HTMLInputBaseProps, "type" | "maxLength" | "minLength">,
    RebuiltInputCommonProps {
  /**
   * The current value of the input.
   */
  readonly value: string;

  /**
   * Custom onChange handler that provides the new value as the first argument.
   */
  readonly onChange: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * Blur callback.
   */
  readonly onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * A callback to handle "Enter" keypress. This will only run
   * if Enter is the only key. Will not run if Shift or Control
   * are being held.
   */
  readonly onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Focus callback.
   */
  readonly onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * A pattern to specify the format to display the phone number in.
   * For example if you want to display the format for [Denmark](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers#Denmark)
   * you could set it to `** ** ** **`
   * @default "(***) ***-****"
   */
  readonly pattern?: InputMaskProps["pattern"];

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

export const DEFAULT_PATTERN = "(***) ***-****";
