import type { Key, Ref, RefObject } from "react";
import type { FormFieldProps } from "../FormField";
import type { InputTextRebuiltProps, InputTextRef } from "../InputText";

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
  label: string;
}

interface MenuActionBase {
  type: "action";
  id: Key;
  label: string;
  /*
   * Determines if the menu should close when the action is used.
   *
   * @default true
   */
  shouldClose?: boolean;
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

interface AutocompleteRebuiltBaseProps<
  Value extends OptionLike,
  Multiple extends boolean,
  SectionExtra extends object,
  ActionExtra extends object,
> {
  version: 2;

  readonly multiple?: Multiple;
  /*
   * The currently selected value of the Autocomplete.
   * Single-select: undefined indicates no selection
   */
  readonly value: AutocompleteValue<Value, Multiple>;
  /*
   * The current input value of the Autocomplete.
   */
  readonly inputValue: string;
  /*
   * Callback invoked when the input value changes.
   */
  readonly onInputChange: (value: string) => void;

  /*
   * TODO decide if blur means the input or the overall autocomplete
   */
  readonly onBlur?: () => void;
  /*
   * TODO decide if focus means the input or the overall autocomplete
   */
  readonly onFocus?: () => void;

  /**
   * Custom equality for input text to option mapping.
   * Defaults to case-sensitive label equality via getOptionLabel.
   */
  readonly inputEqualsOption?: (input: string, option: Value) => boolean;

  /*
   * Data structure for the menu.
   * Observes a data hierarchy to determine elements, order, and grouping.
   * Accepts Sections, Options as top level objects in the array.
   * Actions may appear in both sections and options.
   */
  readonly menu: MenuItem<Value, SectionExtra, ActionExtra>[];

  /**
   * Controls how options are filtered in response to the current input value.
   * - Omit to use the default case-insensitive substring match against labels using getOptionLabel
   * - Provide a function to implement custom filtering logic
   * - Set to `false` to opt out of filtering entirely (useful for async options)
   */
  readonly filterOptions?:
    | ((option: Value, inputValue: string) => boolean)
    | false;

  /*
   * Used to determine the label for a given option, useful for custom data for options.
   * Defaults to  option.label.
   */
  readonly getOptionLabel?: (option: Value) => string;

  /**
   * Used to determine the key for a given option. This can be useful when the
   * labels of options are not unique (since labels are used as keys by default).
   * Defaults to the option.label.
   */
  readonly getOptionKey?: (option: Value) => Key;

  /*
   * Render prop to customize the rendering of an option.
   * @param args.value - The option value including all extra keys from the menu item
   * @param args.isActive - Whether the option is currently highlighted/active
   * @param args.isSelected - Whether the option is currently selected
   */
  readonly renderOption?: (args: {
    value: Value;
    isActive: boolean;
    isSelected: boolean;
  }) => React.ReactNode;
  /*
   * Render prop to customize the rendering of a section.
   * @param args.section - The section value including all extra keys from the menu item
   */
  readonly renderSection?: (
    section: MenuSection<Value, SectionExtra, ActionExtra>,
  ) => React.ReactNode;
  /*
   * Render prop to customize the rendering of an action.
   * @param args.value - The action value including all extra keys from the menu item
   * @param args.isActive - Whether the action is currently highlighted/active
   */
  readonly renderAction?: (args: {
    value: MenuAction<ActionExtra>;
    isActive: boolean;
  }) => React.ReactNode;

  /*
   * Render prop to customize the rendering of the input.
   * @param props.inputRef - The ref to the input element
   * @param props.inputProps - The props to pass to the input element
   * Note that you must pass the inputRef to the input
   */
  readonly renderInput?: (props: {
    inputRef: Ref<HTMLInputElement | HTMLTextAreaElement>;
    inputProps: InputTextRebuiltProps;
  }) => React.ReactNode;

  /*
   * Render a custom empty state when the menu is empty.
   *
   * @default string "No options"
   */
  readonly emptyState?: React.ReactNode;

  /*
   * Whether the menu should open when the input gains focus.
   *
   * @default false
   */
  readonly openOnFocus?: boolean;

  /*
   * The placeholder text for the input.
   */
  readonly placeholder?: string;
  /*
   * Whether the input is disabled.
   */
  readonly disabled?: boolean;
  /*
   * Error message to display below the input
   * When present, invalid appearance applied to the input
   */
  readonly error?: string;
  /*
   * Whether the input is invalid. Receives invalid appearance.
   */
  readonly invalid?: boolean;
  /*
   * Whether the input is read-only.
   * TODO: implement
   * @default false
   */
  readonly readonly?: boolean;
  /*
   * Whether the input is required.
   * TODO: implement, maybe
   */
  readonly required?: boolean;
  /*
   * Description to display below the input
   */
  readonly description?: string;
  /*
   * TODO: implement
   * Name of the input for form submission
   */
  readonly name?: string;
  /*
   * Size of the input
   * TODO: implement?
   */
  readonly size?: "small" | "base" | "large";

  /*
   * Whether the input is clearable.
   * TODO: implement
   */
  readonly clearable?: boolean;

  /*
   * Callback invoked when the menu opens.

   */
  readonly onOpen?: () => void;
  /*
   * Callback invoked when the menu closes.

   */
  readonly onClose?: () => void;

  // TODO: for multi select - not used yet
  readonly renderSelectedItems?: (props: {
    items: Value[];
    onRemove: (item: Value) => void;
  }) => React.ReactNode;

  /*
   * Whether the menu is loading.
   * Displays glimmers in the menu
   */
  readonly loading?: boolean;

  /*
   * Custom equality for option to value mapping.
   * TODO: decide if we wanna keep this
   */
  readonly isOptionEqualToValue?: (option: Value, value: Value) => boolean;
}

interface FreeFormOff<Value extends OptionLike, Multiple extends boolean> {
  /*
   * Whether the autocomplete allows free-form input.
   * When true, the input value is not restricted to the options in the menu. Input can be used to create a new value.
   * When false, the input value must match an option in the menu.
   * Input value will be cleared if no selection is made and focus is lost.
   */
  readonly allowFreeForm?: false;
  /*
   * The current selection value of the Autocomplete.
   */
  readonly value: AutocompleteValue<Value, Multiple>;
  /*
   * Callback invoked when the selection value changes.
   */
  readonly onChange: (value: AutocompleteValue<Value, Multiple>) => void;
}

interface FreeFormOn<Value extends OptionLike, Multiple extends boolean> {
  /*
   * Whether the autocomplete allows free-form input.
   * When true, the input value is not restricted to the options * in the menu. Input can be used to create a new value.
   * When false, the input value must match an option in the menu.
   * Input value will be cleared if no selection is made and   /*
   * Whether the autocomplete allows free-form input.
   * When true, the input value is not restricted to the options in the menu. Input can be used to create a new value.
   * When false, the input value must match an option in the menu.
   * Input value will be cleared if no selection is made and focus is lost.
   * */
  readonly allowFreeForm: true;
  /*
   * The current selection value of the Autocomplete.
   */
  readonly value: AutocompleteValue<Value, Multiple>;
  /**
   * Factory used to create a Value from free-form input when committing. Necessary with complex option values. The only value the input can produce is a string.
   * @param input - The input value
   */
  readonly createFreeFormValue: (input: string) => Value;
  /*
   * Callback invoked when the selection value changes.
   * This is called when we consider a selection "committed"
   * - The user presses enter
   * - The user clicks outside the menu with a selection typed
   * - The user clicks the clear button
   * The user clears a previous selection by deleting the input value
   * - The user selects an option with click or enter
   * - The user types a value that matches an option
   * - The user types a value that does not match an option and allowFreeForm is true
   */
  readonly onChange: (value: AutocompleteValue<Value, Multiple>) => void;
}

export type AutocompleteRebuiltProps<
  Value extends OptionLike = OptionLike,
  Multiple extends boolean = false,
  SectionExtra extends object = Record<string, unknown>,
  ActionExtra extends object = Record<string, unknown>,
> = AutocompleteRebuiltBaseProps<Value, Multiple, SectionExtra, ActionExtra> &
  (FreeFormOn<Value, Multiple> | FreeFormOff<Value, Multiple>);

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
