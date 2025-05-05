import { Clearable } from "@jobber/hooks/useShowClear";
import { InputMaskProps } from "./InputMask";
import { CommonFormFieldProps, FormFieldProps } from "../FormField";

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
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "onChange"
    | "onBlur"
    | "size"
    | "suffix"
    | "prefix"
    | "value"
    | "max"
    | "min"
    | "defaultValue"
    | "readOnly"
    | "type"
  > {
  readonly error?: string;
  readonly invalid?: boolean;
  readonly identifier?: string;
  readonly autocomplete?: boolean | string;
  readonly loading?: boolean;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly children?: React.ReactNode;
  readonly clearable?: Clearable;

  readonly value: string;
  readonly onChange: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  readonly onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  readonly onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;

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

  /**
   * Version 2 is highly experimental, avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;

  readonly size?: FormFieldProps["size"];
  readonly inline?: FormFieldProps["inline"];
  readonly align?: FormFieldProps["align"];
  readonly prefix?: FormFieldProps["prefix"];
  readonly suffix?: FormFieldProps["suffix"];
  readonly description?: FormFieldProps["description"];
  readonly readonly?: boolean;
}

export const DEFAULT_PATTERN = "(***) ***-****";
