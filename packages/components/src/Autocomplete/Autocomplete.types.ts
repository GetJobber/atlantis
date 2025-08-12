import { Key, Ref, RefObject } from "react";
import { FormFieldProps } from "../FormField";
import { InputTextRebuiltProps, InputTextRef } from "../InputText";

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
  readonly attachTo: HTMLDivElement | null;
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

// Base constraint for any v2 option value (minimal shape)
// Arbitrary extra keys are allowed by structural typing of consumer types
export interface OptionLike {
  id: Key;
  label: string;
}

interface MenuActionBase {
  type: "action";
  id: Key;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: string; // or React.ReactNode
}

export type MenuAction<Extra extends object = Record<string, unknown>> =
  MenuActionBase & Extra;

export type MenuSection<
  T extends OptionLike,
  SectionExtra extends object = Record<string, unknown>,
  ActionExtra extends object = Record<string, unknown>,
> = SectionExtra & {
  type: "section";
  id: Key;
  label: string;
  options: T[];
  // Rendered at the bottom of this section
  actionsBottom?: MenuAction<ActionExtra>[];
};

export interface MenuOptions<
  T extends OptionLike,
  ActionExtra extends object = Record<string, unknown>,
> {
  type: "options";
  // For flat lists without sections
  options: T[];
  // Rendered at the bottom of the entire flat list
  actionsBottom?: MenuAction<ActionExtra>[];
}

export type MenuItem<
  T extends OptionLike,
  SectionExtra extends object = Record<string, unknown>,
  ActionExtra extends object = Record<string, unknown>,
> = MenuSection<T, SectionExtra, ActionExtra> | MenuOptions<T, ActionExtra>;

export type AutocompleteValue<
  Value extends OptionLike,
  Multiple extends boolean,
> = Multiple extends true ? Value[] : Value | undefined;

export interface AutocompleteProposedProps<
  Value extends OptionLike = OptionLike,
  Multiple extends boolean = false,
  SectionExtra extends object = Record<string, unknown>,
  ActionExtra extends object = Record<string, unknown>,
> {
  version: 2;

  /*
   * Must-haves
   */
  // Controlled state
  readonly multiple?: Multiple;
  readonly value: AutocompleteValue<Value, Multiple>;
  // consider including the event and "reason"
  // undefined is debatable, could make sense for single select
  readonly onChange: (value: AutocompleteValue<Value, Multiple>) => void;
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;

  readonly onBlur?: () => void;
  readonly onFocus?: () => void;

  readonly allowFreeForm?: boolean;

  // Menu structure
  // prefer items or options? menu does describe the purpose better. tbd.
  readonly menu: MenuItem<Value, SectionExtra, ActionExtra>[];

  // Filtering & display
  readonly filterOptions: (option: Value, inputValue: string) => boolean;
  // Strongly recommended when Value is a custom object
  readonly getOptionLabel: (option: Value) => string;
  // Strongly recommended when Value is a custom object
  readonly getOptionValue: (option: Value) => Key;

  // Rendering
  readonly renderOption?: (option: Value) => React.ReactNode;
  readonly renderSection?: (
    section: MenuSection<Value, SectionExtra, ActionExtra>,
  ) => React.ReactNode;
  readonly renderAction?: (action: MenuAction<ActionExtra>) => React.ReactNode;

  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly invalid?: boolean;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly open?: boolean;
  readonly description?: string;
  readonly name?: string;
  readonly size?: "small" | "base" | "large";

  readonly clearable?: boolean;

  /*
   * Not necessary but trivial to add so might as well
   */
  readonly onOpen?: () => void;
  readonly onClose?: () => void;

  /*
   * Technically a must-have but implemented in a different way to solve the same problem
   */
  // this replace suffix, prefix and anything else you'd want to modify on the input
  readonly renderInput?: (props: {
    inputRef: Ref<HTMLInputElement | HTMLTextAreaElement>;
    inputProps: InputTextRebuiltProps;
  }) => React.ReactNode;

  /*
   * Nice-to-haves & improvements
   */
  readonly renderSelectedItems?: (props: {
    items: Value[];
    onRemove: (item: Value) => void;
  }) => React.ReactNode;

  // this one I'd argue for including but requires a bit of design possibly
  // and other loading props eg. text/element
  readonly loading?: boolean;

  readonly autoHighlight?: boolean;
  readonly autoSelect?: boolean;
  readonly blurOnSelect?: boolean;

  readonly clearOnEscape?: boolean;
  readonly filterSelectedOptions?: boolean;

  // groupBy?
  // sectionBy? this could replace the renderSection prop

  readonly isOptionEqualToValue?: (option: Value, value: Value) => boolean;

  readonly onHighlightChange?: (option: Value) => void;

  readonly openOnFocus?: boolean;

  readonly selectOnFocus?: boolean;
}

// Convenience builder helpers (optional usage)
export const menuOptions = <
  T extends OptionLike,
  ActionExtra extends object = Record<string, unknown>,
>(
  options: T[],
  actionsBottom?: MenuAction<ActionExtra>[],
): MenuOptions<T, ActionExtra> => ({ type: "options", options, actionsBottom });

export const menuSection = <
  T extends OptionLike,
  SectionExtra extends object = Record<string, unknown>,
  ActionExtra extends object = Record<string, unknown>,
>(
  id: Key,
  label: string,
  options: T[],
  actionsBottom?: MenuAction<ActionExtra>[],
  extra?: SectionExtra,
): MenuSection<T, SectionExtra, ActionExtra> => ({
  type: "section",
  id,
  label,
  options,
  actionsBottom,
  ...(extra || ({} as SectionExtra)),
});

// Helper to improve inference from inline menu literals
export function defineMenu<
  T extends OptionLike,
  S extends object = Record<string, unknown>,
  A extends object = Record<string, unknown>,
>(menu: MenuItem<T, S, A>[]): MenuItem<T, S, A>[] {
  return menu;
}
