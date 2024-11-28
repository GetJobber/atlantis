import { XOR } from "ts-xor";
import { Ref } from "react";
import { GroupOption, Option } from "./Option";
import { FormFieldProps } from "../FormField";
import { InputTextRef } from "../InputText";

export type OptionCollection = XOR<Option, GroupOption>[];

export interface AutocompleteProps
  extends Pick<
    FormFieldProps,
    | "clearable"
    | "invalid"
    | "name"
    | "onBlur"
    | "onFocus"
    | "prefix"
    | "size"
    | "suffix"
    | "validations"
  > {
  /**
   * @deprecated
   * Use `ref` instead.
   */
  readonly inputRef?: FormFieldProps["inputRef"];

  /**
   * Initial options to show when user first focuses the Autocomplete
   */
  readonly initialOptions?: OptionCollection;

  /**
   * Set Autocomplete value.
   */
  readonly value?: Option;

  /**
   * Allow the autocomplete to use values not from the drop down menu.
   *
   * @default true
   */
  readonly allowFreeForm?: boolean;

  /**
   * Debounce in milliseconds for getOptions
   *
   * @default 300
   */
  readonly debounce?: number;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  readonly onChange?: (newValue?: Option) => void;

  /**
   * Called as the user types in the input. The autocomplete will display what
   * is returned from this method to the user as available options.
   * @param newInputText
   */
  getOptions(
    newInputText: string,
  ): OptionCollection | Promise<OptionCollection>;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  readonly defaultValue?: Option;
}

export interface AutocompleteInternalProps extends AutocompleteProps {
  readonly id: string;
  readonly ref?: Ref<InputTextRef>;
}
