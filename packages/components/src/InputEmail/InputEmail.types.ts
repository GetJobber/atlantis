import { Clearable } from "@jobber/hooks";
import { CommonFormFieldProps, FormFieldProps } from "../FormField";

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
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "onChange"
    | "onBlur"
    | "maxLength"
    | "size"
    | "suffix"
    | "prefix"
    | "value"
    | "max"
    | "min"
    | "defaultValue"
  > {
  readonly error?: string;
  readonly invalid?: boolean;
  readonly identifier?: string;
  readonly autocomplete?: boolean | string;
  readonly loading?: boolean;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly children?: React.ReactNode;
  readonly clearable?: Clearable;

  /**
   * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;

  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  readonly onEnter?: FormFieldProps["onEnter"];
  readonly onBlur?: FormFieldProps["onBlur"];
  readonly value: string;
  readonly maxLength?: number;
  readonly size?: FormFieldProps["size"];
  readonly inline?: FormFieldProps["inline"];
  readonly align?: FormFieldProps["align"];
  readonly toolbar?: FormFieldProps["toolbar"];
  readonly toolbarVisibility?: FormFieldProps["toolbarVisibility"];
  readonly prefix?: FormFieldProps["prefix"];
  readonly suffix?: FormFieldProps["suffix"];
  readonly description?: FormFieldProps["description"];
}

export interface InputEmailRef {
  insert(text: string): void;
  blur(): void;
  focus(): void;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}
