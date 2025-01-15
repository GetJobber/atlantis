import { XOR } from "ts-xor";
import { RefObject } from "react";
import { FormFieldProps } from "../FormField";

export type OptionCollection = XOR<Option[], GroupOption[]>;
export interface AutocompleteProps
  extends Pick<
    FormFieldProps,
    | "clearable"
    | "description"
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
  readonly value: Option | undefined;

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
  onChange(newValue?: Option): void;

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
}

export interface Option extends BaseOption {
  value?: OptionValue;
  description?: string;
  details?: string;
}

export interface GroupOption extends BaseOption {
  options: Option[];
}

export type AnyOption = XOR<Option, GroupOption>;

export type OptionValue = string | number;

export interface BaseOption {
  label: string;
}

export type UseAutocompleteProps = Pick<
  AutocompleteProps,
  "initialOptions" | "value" | "debounce" | "getOptions"
>;

export type UseAutocompleteHandlersProps = AutocompleteProps & {
  updateInput: (newText: string) => void;
  setMenuVisible: (visible: boolean) => void;
  inputText: string;
  setInputText: (newText: string) => void;
};

export enum IndexChange {
  Previous = -1,
  Next = 1,
}

export interface AutocompleteMenuProps {
  readonly visible: boolean;
  readonly options?: Option[];
  readonly selectedOption?: Option;
  /**
   * Element that it's attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption?: Option): void;
  setMenuRef(menuRef: HTMLElement | null): void;
  menuRef?: HTMLElement | null;
  attributes: Record<string, object | undefined>;
  addSeparators: boolean;
  targetWidth?: number;
  highlightedIndex: number;
  popperStyles: {
    [key: string]: React.CSSProperties;
  };
  isGroup(option?: AnyOption): boolean;
  isOptionSelected(
    selectedOption?: Option | undefined,
    option?: Option,
  ): boolean | undefined;
}

export interface UseKeyListenersProps {
  readonly options?: Option[];
  readonly visible: boolean;
  readonly menuRef?: HTMLElement | null;
  onOptionSelect(chosenOption?: Option): void;
  readonly highlightedIndex: number;
  readonly setHighlightedIndex: (index: number) => void;
}

export interface UseAutocompleteMenuProps {
  readonly options?: Option[];
  readonly visible: boolean;
  readonly menuRef?: HTMLElement | null;
  onOptionSelect(chosenOption?: Option): void;
}

export type AutoCompleteMenuOptionProps = Pick<
  AutocompleteMenuProps,
  | "highlightedIndex"
  | "addSeparators"
  | "isGroup"
  | "selectedOption"
  | "isOptionSelected"
  | "onOptionSelect"
> & { index: number; option: AutocompleteMenuProps["selectedOption"] };
