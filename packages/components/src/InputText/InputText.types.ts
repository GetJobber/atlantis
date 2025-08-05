import { type Clearable } from "@jobber/hooks/useShowClear";
import { XOR } from "ts-xor";
import {
  AutocompleteTypes,
  CommonFormFieldProps,
  FormFieldProps,
  FormFieldTypes,
} from "../FormField";

export interface RowRange {
  min: number;
  max: number;
}

export type InputTextVersion = 1 | 2 | undefined;

/**
 * Experimental version 2 of the InputText component.
 * Do not use unless you have talked with Atlantis first.
 */
export interface InputTextRebuiltProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    | "onChange"
    | "onBlur"
    | "maxLength"
    | "rows"
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
  readonly autocomplete?: boolean | AutocompleteTypes;
  readonly loading?: boolean;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly children?: React.ReactNode;
  readonly clearable?: Clearable;
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline?: boolean;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an object with a min
   * and max keys indicating the minimum number of visible rows, and the
   * maximum number of visible rows.
   */
  readonly rows?: number | RowRange;
  readonly type?: FormFieldTypes;

  /**
   * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;

  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

interface BaseProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "autofocus"
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "keyboard"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "onChange"
      | "inputRef"
      | "validations"
      | "defaultValue"
      | "prefix"
      | "suffix"
      | "toolbar"
      | "toolbarVisibility"
      | "version"
    > {
  multiline?: boolean;
}

export interface InputTextRef {
  insert(text: string): void;
  blur(): void;
  focus(): void;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

interface MultilineProps extends BaseProps {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline: true;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an object with a min
   * and max keys indicating the minimum number of visible rows, and the
   * maximum number of visible rows.
   */
  readonly rows?: number | RowRange;
}
/**
 * InputText props for the existing version of InputText
 */
export type InputTextLegacyProps = XOR<BaseProps, MultilineProps>;
