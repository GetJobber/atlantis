import type { InputMaskProps } from "./InputMask";
import type {
  CommonFormFieldProps,
  FocusEvents,
  FormFieldProps,
  HTMLInputBaseProps,
  KeyboardEvents,
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
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
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
   * A callback to handle "Enter" keypress. This will only run
   * if Enter is the only key. Will not run if Shift or Control
   * are being held.
   */
  readonly onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * A pattern to specify the format to display the phone number in.
   * For example if you want to display the format for [Denmark](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers#Denmark)
   * you could set it to `** ** ** **`
   * @default "(***) ***-****"
   */
  readonly pattern?: InputMaskProps["pattern"];
}

export const DEFAULT_PATTERN = "(***) ***-****";
