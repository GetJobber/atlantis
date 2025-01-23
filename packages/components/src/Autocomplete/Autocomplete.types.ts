import { RefObject } from "react";
import { FormFieldProps } from "../FormField";

type OptionValue = string | number;

export interface BaseOption {
  label: string;
}

export interface Option extends BaseOption {
  value?: OptionValue;
  description?: string;
  details?: string;
}

export interface GroupOption extends BaseOption {
  options: Option[];
}

export type OptionCollection = AnyOption[];
export type AnyOption<
  GenericOption extends Option | GroupOption = Option | GroupOption,
> = GenericOption;

export interface AutocompleteProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
> extends Pick<
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

  readonly initialOptions?: GenericOption[];

  /**
   * Set Autocomplete value.
   */
  readonly value: GenericOptionValue | undefined;

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
  onChange(newValue?: GenericOptionValue): void;

  /**
   * Called as the user types in the input. The autocomplete will display what
   * is returned from this method to the user as available options.
   * @param newInputText
   */
  getOptions(
    newInputText: string,
  ):
    | Array<GenericGetOptionsValue | GenericOption>
    | Promise<Array<GenericGetOptionsValue | GenericOption>>;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  readonly customMenuRender?: (
    props: CustomOptionsMenuProp<
      GenericOption | GenericGetOptionsValue,
      GenericOptionValue
    >,
  ) => React.ReactElement;
}

export type CustomOptionsMenuType<GenericOption extends AnyOption = AnyOption> =
  (props: CustomOptionsMenuProp<GenericOption>) => React.ReactElement;

export interface MenuProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
> {
  readonly visible: boolean;
  readonly options: GenericOption[];
  readonly selectedOption?: GenericOptionValue;

  /**
   * Element that the menu is attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption?: GenericOptionValue): void;
  readonly customMenuRender?: (
    props: CustomOptionsMenuProp<GenericOption, GenericOptionValue>,
  ) => React.ReactElement;
}

export interface CustomOptionsMenuProp<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
> {
  /**
   * The options to display in the menu
   */
  options: GenericOption[];
  /**
   * The currently selected option
   */
  selectedOption?: GenericOptionValue;
  /**
   * The HTML element that wraps the menu content
   */
  readonly menuRef: HTMLElement | null | undefined;
  /**
   * Callback to select an option
   */
  readonly onOptionSelect: (chosenOption?: GenericOptionValue) => void;
}
