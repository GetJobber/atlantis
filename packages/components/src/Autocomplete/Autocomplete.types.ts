import type { CSSProperties, Key, Ref, RefObject } from "react";
import type { FormFieldProps } from "../FormField";
import type { InputTextRebuiltProps, InputTextRef } from "../InputText";

// Extra props shape used across action/section/header/footer generics
export type ExtraProps = Record<string, unknown>;

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
   * v1 provides InputTextRef; v2 provides a DOM element ref.
   */
  readonly inputRef: RefObject<
    InputTextRef | HTMLInputElement | HTMLTextAreaElement | null
  >;
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
  /**
   * "label" will be used as the key by default
   * If labels are not unique, a unique key must be provided
   */
  key?: Key;
}

interface MenuActionBase {
  type: "action";
  label: string;
  /**
   * "label" will be used as the key by default
   * If labels are not unique, a unique key must be provided
   */
  key?: Key;
  /**
   * Determines if the menu should close when the action is used.
   *
   * @default true
   */
  shouldClose?: boolean;
  onClick: () => void;
}

export type MenuAction<Extra extends object = ExtraProps> = MenuActionBase &
  Extra;

export interface ActionConfig {
  run: () => void;
  closeOnRun?: boolean;
}

export type MenuSection<
  T extends OptionLike,
  SectionExtra extends object = ExtraProps,
  ActionExtra extends object = ExtraProps,
> = SectionExtra & {
  type: "section";
  label: string;
  /**
   * "label" will be used as the key by default
   * If labels are not unique, a unique key must be provided
   */
  key?: Key;
  options: T[];
  // Section-specific actions
  actions?: MenuAction<ActionExtra>[];
};

export interface MenuOptions<
  T extends OptionLike,
  ActionExtra extends object = ExtraProps,
> {
  type: "options";
  // For flat lists without sections
  options: T[];
  // Actions for the flat list
  actions?: MenuAction<ActionExtra>[];
}

export type MenuHeader<Extra extends object = ExtraProps> = Extra & {
  type: "header";
  label: string;
  /**
   * "label" will be used as the key by default
   * If labels are not unique, a unique key must be provided
   */
  key?: Key;
  /**
   * If provided, the header item is interactive and participates in
   * arrow-key navigation. Activated with Enter.
   */
  onClick?: () => void;
  /**
   * Determines if the menu should close when the header is activated.
   * @default true
   */
  shouldClose?: boolean;
};

export type MenuFooter<Extra extends object = ExtraProps> = Extra & {
  type: "footer";
  label: string;
  /**
   * "label" will be used as the key by default
   * If labels are not unique, a unique key must be provided
   */
  key?: Key;
  /**
   * If provided, the footer item is interactive and participates in
   * arrow-key navigation. Activated with Enter.
   */
  onClick?: () => void;
  /**
   * Determines if the menu should close when the footer is activated.
   * @default true
   */
  shouldClose?: boolean;
};

export type MenuItem<
  T extends OptionLike,
  SectionExtra extends object = ExtraProps,
  ActionExtra extends object = ExtraProps,
> =
  | MenuSection<T, SectionExtra, ActionExtra>
  | MenuOptions<T, ActionExtra>
  | MenuHeader<ActionExtra>
  | MenuFooter<ActionExtra>;

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

  /**
   * Whether the autocomplete allows multiple selections.
   * WARNING: This is currently incomplete and will not display selections, only data is returned.
   * Do not use this prop unless you are sure you know what you are doing.
   */
  readonly multiple?: Multiple;
  /**
   * The currently selected value of the Autocomplete.
   * Single-select: undefined indicates no selection
   */
  readonly value: AutocompleteValue<Value, Multiple>;
  /**
   * The current input value of the Autocomplete.
   */
  readonly inputValue: string;
  /**
   * Callback invoked when the input value changes.
   */
  readonly onInputChange: (value: string) => void;

  /**
   * Callback invoked when the input is blurred.
   */
  readonly onBlur?: () => void;
  /**
   * Callback invoked when the input is focused.
   */
  readonly onFocus?: () => void;

  /**
   * Custom equality for input text to option mapping.
   * Defaults to case-sensitive label equality via getOptionLabel.
   */
  readonly inputEqualsOption?: (input: string, option: Value) => boolean;

  /**
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
    | ((options: Value[], inputValue: string) => Value[])
    | false;

  /**
   * Used to determine the label for a given option, useful for custom data for options.
   * Defaults to  option.label.
   */
  readonly getOptionLabel?: (option: Value) => string;

  /**
   * Debounce in milliseconds for input-driven filtering and search render.
   * Set to 0 to disable debouncing.
   *
   * @default 300
   */
  readonly debounce?: number;

  /**
   * Render prop to customize the rendering of an option.
   * @param args.value - The option value including all extra keys from the menu item
   * @param args.isActive - Whether the option is currently highlighted/active
   * @param args.isSelected - Whether the option is currently selected
   */
  readonly customRenderOption?: (args: {
    value: Value;
    isActive: boolean;
    isSelected: boolean;
  }) => React.ReactNode;
  /**
   * Render prop to customize the rendering of a section.
   * @param args.section - The section value including all extra keys from the menu item
   */
  readonly customRenderSection?: (
    section: MenuSection<Value, SectionExtra, ActionExtra>,
  ) => React.ReactNode;
  /**
   * Render prop to customize the rendering of an action.
   * @param args.value - The action value including all extra keys from the menu item
   * @param args.isActive - Whether the action is currently highlighted/active
   * @param args.origin - The origin of the action ("menu" or "empty")
   */
  readonly customRenderAction?: (args: {
    value: MenuAction<ActionExtra>;
    isActive: boolean;
    origin?: ActionOrigin;
  }) => React.ReactNode;

  /**
   * Render prop to customize the rendering of header items.
   */
  readonly customRenderHeader?: (args: {
    value: MenuHeader<ActionExtra>;
    isActive?: boolean;
  }) => React.ReactNode;
  /**
   * Render prop to customize the rendering of footer items.
   */
  readonly customRenderFooter?: (args: {
    value: MenuFooter<ActionExtra>;
    isActive?: boolean;
  }) => React.ReactNode;

  /**
   * Render prop to customize the rendering of the input.
   * @param props.inputRef - The ref to the input element
   * @param props.inputProps - The props to pass to the input element
   * Note that you must pass the inputRef to the input
   */
  readonly customRenderInput?: (props: {
    inputRef: Ref<HTMLInputElement | HTMLTextAreaElement>;
    inputProps: InputTextRebuiltProps;
  }) => React.ReactNode;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    menu?: string;
    option?: string;
    section?: string;
    action?: string;
    input?: string;
    header?: string;
    footer?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_styles?: {
    menu?: CSSProperties;
    option?: CSSProperties;
    section?: CSSProperties;
    action?: CSSProperties;
    input?: CSSProperties;
    header?: CSSProperties;
    footer?: CSSProperties;
  };

  /**
   * Render a custom empty state when the menu is empty.
   * NOTE: Do not put interactive elements in the empty state, it will break accessibility.
   * If you require interactive elements in the empty state, use the `emptyActions` prop.
   * To opt out of the default empty state message entirely use "false".
   *
   * @default string "No options"
   */
  readonly emptyStateMessage?: React.ReactNode;

  /**
   * Actions to display when there are no options to render after filtering.
   * Can be a static list or a function that derives actions from the current input value.
   * When provided and options are empty, these are rendered as navigable actions. Compatible with or without `emptyStateMessage`.
   */
  readonly emptyActions?:
    | MenuAction<ActionExtra>[]
    | ((args: { inputValue: string }) => MenuAction<ActionExtra>[]);

  /**
   * Whether the menu should open when the input gains focus.
   *
   * @default true
   */
  readonly openOnFocus?: boolean;

  /**
   * The placeholder text for the input.
   */
  readonly placeholder?: string;
  /**
   * Whether the input is disabled.
   */
  readonly disabled?: boolean;
  /**
   * Error message to display below the input
   * When present, invalid appearance applied to the input
   */
  readonly error?: string;
  /**
   * Whether the input is invalid. Receives invalid appearance.
   */
  readonly invalid?: boolean;
  /**
   * Whether the input is read-only.
   * @default false
   */
  readonly readOnly?: boolean;
  /**
   * Description to display below the input
   */
  readonly description?: string;
  /**
   * Name of the input for form submission
   */
  readonly name?: string;
  /**
   * Size of the input
   */
  readonly size?: InputTextRebuiltProps["size"];

  readonly suffix?: InputTextRebuiltProps["suffix"];
  readonly prefix?: InputTextRebuiltProps["prefix"];

  /**
   * Callback invoked when the menu opens.
   *
   */
  readonly onOpen?: () => void;
  /**
   * Callback invoked when the menu closes.
   *
   */
  readonly onClose?: () => void;

  /**
   * Whether the menu is loading.
   * Displays glimmers in the menu
   */
  readonly loading?: boolean;

  /**
   * Custom render prop for content to render when `loading` is true.
   */
  readonly customRenderLoading?: React.ReactNode;

  /**
   * Custom equality for option to value mapping.
   * TODO: decide if we wanna keep this
   */
  readonly isOptionEqualToValue?: (option: Value, value: Value) => boolean;
}

interface FreeFormOff<Value extends OptionLike, Multiple extends boolean> {
  /**
   * Whether the autocomplete allows free-form input.
   * When true, the input value is not restricted to the options in the menu. Input can be used to create a new value.
   * When false, the input value must match an option in the menu.
   * Input value will be cleared if no selection is made and focus is lost.
   */
  readonly allowFreeForm?: false;
  /**
   * Callback invoked when the selection value changes.
   */
  readonly onChange: (value: AutocompleteValue<Value, Multiple>) => void;
}

interface FreeFormOn<Value extends OptionLike, Multiple extends boolean> {
  /**
   * Whether the autocomplete allows free-form input.
   * When true, the input value is not restricted to the options * in the menu. Input can be used to create a new value.
   * When false, the input value must match an option in the menu.
   * Input value will be cleared if no selection is made and
   * Whether the autocomplete allows free-form input.
   * When true, the input value is not restricted to the options in the menu. Input can be used to create a new value.
   * When false, the input value must match an option in the menu.
   * Input value will be cleared if no selection is made and focus is lost.
   * */
  readonly allowFreeForm: true;
  /**
   * Factory used to create a Value from free-form input when committing. Necessary with complex option values. The only value the input can produce is a string.
   * @param input - The input value
   */
  readonly createFreeFormValue: (input: string) => Value;
  /**
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

export type ActionOrigin = "menu" | "empty";

export type AutocompleteRebuiltProps<
  Value extends OptionLike = OptionLike,
  Multiple extends boolean = false,
  SectionExtra extends object = ExtraProps,
  ActionExtra extends object = ExtraProps,
> = AutocompleteRebuiltBaseProps<Value, Multiple, SectionExtra, ActionExtra> &
  (FreeFormOn<Value, Multiple> | FreeFormOff<Value, Multiple>);

// Convenience builder helpers (optional usage)
export const menuOptions = <
  T extends OptionLike,
  ActionExtra extends object = ExtraProps,
>(
  options: T[],
  actions?: MenuAction<ActionExtra>[],
): MenuOptions<T, ActionExtra> => ({ type: "options", options, actions });

export const menuSection = <
  T extends OptionLike,
  SectionExtra extends object = ExtraProps,
  ActionExtra extends object = ExtraProps,
>(
  label: string,
  options: T[],
  actions?: MenuAction<ActionExtra>[],
  extra?: SectionExtra,
): MenuSection<T, SectionExtra, ActionExtra> => ({
  type: "section",
  label,
  options,
  actions,
  ...(extra || ({} as SectionExtra)),
});

// Helper to improve inference from inline menu literals
export function defineMenu<
  T extends OptionLike,
  S extends object = ExtraProps,
  A extends object = ExtraProps,
>(menu: MenuItem<T, S, A>[]): MenuItem<T, S, A>[] {
  return menu;
}
