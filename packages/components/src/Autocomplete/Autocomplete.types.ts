import { RefObject } from "react";
import { FormFieldProps } from "../FormField";
import { InputTextRef } from "../InputText";

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

export type OptionInGroup<T extends AnyOption> = T extends GroupOption
  ? T["options"][number]
  : T;

export interface AutocompleteBaseProps<
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
  > {
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
   * This isn't entirely accurate.
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange(newValue?: GenericOptionValue): void;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  /**
   * Override the content rendered in the menu.
   */
  readonly customRenderMenu?: (
    props: CustomOptionsMenuProp<
      GenericOption | GenericGetOptionsValue,
      GenericOptionValue
    >,
  ) => React.ReactElement;
}

export interface AutocompleteLegacyProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
> extends AutocompleteBaseProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > {
  /**
   * Version of the component to use.
   * @default 1
   */
  readonly version?: 1;

  /**
   * @deprecated
   * Use `ref` instead.
   */
  readonly inputRef?: FormFieldProps["inputRef"];

  /**
   * Initial options to display in the autocomplete.
   */
  readonly initialOptions?: GenericOption[];

  /**
   * Called as the user types in the input. The autocomplete will display what
   * is returned from this method to the user as available options.
   * @param newInputText
   */
  readonly getOptions: (
    newInputText: string,
  ) =>
    | Array<GenericGetOptionsValue | GenericOption>
    | Promise<Array<GenericGetOptionsValue | GenericOption>>;

  /**
   * Debounce in milliseconds for getOptions
   *
   * @default 300
   */
  readonly debounce?: number;

  /**
   * Validations to run on the input.
   */
  readonly validations?: FormFieldProps["validations"];
}

export interface AutocompleteRebuiltProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
> extends AutocompleteBaseProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > {
  /**
   * Version 2 is highly experimental, avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;

  /**
   * Options to display in the autocomplete.
   */
  readonly options: GenericOption[];

  /**
   * Callback when the input value changes. (Distinct from `onChange`)
   */
  readonly onInputChange?: (inputValue: string) => void;

  /**
   * Error message to display
   */
  readonly error?: string;
}

// For backward compatibility
export type AutocompleteProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
> = AutocompleteLegacyProps<
  GenericOption,
  GenericOptionValue,
  GenericGetOptionsValue
>;

export type CustomOptionsMenuType<GenericOption extends AnyOption = AnyOption> =
  (props: CustomOptionsMenuProp<GenericOption>) => React.ReactElement;

export interface MenuProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
> {
  readonly options: GenericOption[];
  readonly selectedOption?: GenericOptionValue;
  readonly inputFocused: boolean;

  /**
   * Element that the menu is attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  /**
   * Ref to the TextInput element.
   */
  readonly inputRef: RefObject<InputTextRef | null>;
  onOptionSelect(chosenOption?: GenericOptionValue): void;
  readonly customRenderMenu?: (
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
  options: Array<OptionInGroup<GenericOption> | GenericOption>;
  /**
   * The currently selected option
   */
  selectedOption?: GenericOptionValue;
  /**
   * The HTML element that wraps the menu content. Used for handling keyboard scroll behavior.
   */
  readonly menuRef: HTMLElement | null | undefined;
  /**
   * Callback to select an option
   */
  readonly onOptionSelect: (chosenOption?: GenericOptionValue) => void;
  /**
   * Determine if the input is focused. Can be used to conditionally render the menu.
   */
  readonly inputFocused: boolean;

  /**
   * Ref to the TextInput element.
   */
  readonly inputRef: RefObject<InputTextRef | null>;
  /**
   * Component that wraps the menu content. Used for handling keyboard scroll behavior.
   */
  readonly MenuWrapper: (props: {
    children: React.ReactNode;
    visible: boolean;
  }) => React.ReactElement;
}
