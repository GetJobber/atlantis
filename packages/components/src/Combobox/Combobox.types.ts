import type { Dispatch, ReactElement, SetStateAction } from "react";

type ComboboxFragment = Iterable<ComboboxNode>;
type ComboboxNode = ReactElement | ComboboxFragment;

export interface ComboboxProps {
  readonly children?: ComboboxNode;

  /**
   * When `true`, `Combobox` will allow for multiple selections
   *
   * @default false
   */
  readonly multiSelect?: boolean;

  /**
   * The selected options of the Combobox.
   */
  readonly selected: ComboboxOption[];

  /**
   * The encapsulating noun for the content of the combobox. Used
   * in the empty state, and search placeholder. Should be pluralized.
   */
  readonly subjectNoun?: string;

  /**
   * Callback function invoked upon the selection of an option. Provides the selected option(s) as an argument.
   */
  readonly onSelect: (selection: ComboboxOption[]) => void;

  /**
   * Callback function invoked upon the selection of all options. Provides the selected option(s) as an argument.
   * This is only available when `multiSelect` is `true`.
   */
  readonly onSelectAll?: (selection: ComboboxOption[]) => void;

  /**
   * Callback function invoked upon the clearing of all options.
   * This is only available when `multiSelect` is `true`.
   */
  readonly onClear?: () => void;

  /**
   * Callback function invoked upon the Combobox menu closing.
   */
  readonly onClose?: () => void;

  /**
   * Debounced callback function invoked on Combobox search input change. Receives the current search value as an argument.
   */
  readonly onSearch?: (searchValue: string) => void;

  /**
   * The amount of time in ms to debounce the onSearch callback. Defaults to 300ms.
   */
  readonly onSearchDebounce?: number;

  /**
   * Callback to load more options, this is called when the user scrolls to the bottom of the list.
   */
  readonly onLoadMore?: () => void;

  /**
   * The Chip heading for the trigger
   */
  readonly label?: string;

  /**
   * Should the Combobox display the loading state.
   */
  readonly loading?: boolean;

  /**
   * A ref to the default activator button element.
   */
  readonly defaultActivatorRef?: React.Ref<HTMLButtonElement>;
}

export interface ComboboxCustomActivatorProps {
  /**
   * Required to describe the expanded state of the Combobox.
   * Automatically updates as open state is toggled.
   */
  ariaExpanded: boolean;

  /**
   * Required to describe the relationship between the toggle-able Combobox Menu and the activator.
   */
  ariaControls: string;

  /**
   * The aria-label attribute for the Combobox activator.
   */
  ariaLabel?: string;

  /**
   * Required to describe the interactive element which toggles the Combobox's visibility.
   */
  role: "combobox";

  /**
   * Method to open the Combobox. Closing is handled by the Combobox itself.
   */
  open: () => void;
}

export type ComboboxActivatorAccessibility = Omit<
  ComboboxCustomActivatorProps,
  "open"
>;

export interface ComboboxActivatorProps {
  readonly children:
    | React.ReactElement
    | ((props: ComboboxCustomActivatorProps) => React.ReactElement);
}

export interface ComboboxTriggerProps
  extends Pick<ComboboxContentProps, "selected"> {
  readonly label?: string;
  readonly activatorRef?: React.Ref<HTMLButtonElement>;
}

export interface ComboboxOptionProps {
  /**
   * A unique identifier for the option.
   */
  id: string | number;

  /**
   * The value to be visually displayed in the Combobox options list.
   */
  label: string;

  /**
   * An optional component to be displayed before the label.
   */
  prefix?: React.ReactNode;

  /**
   * Advanced: A custom render prop to completely control how this option is rendered.
   * The function receives the option's props, and a boolean indicating if the option is selected.
   */
  readonly customRender?: (
    option: Omit<ComboboxOptionProps, "customRender"> & {
      isSelected: boolean;
    },
  ) => React.ReactNode;

  /**
   * Callback function invoked when the option is clicked.
   */
  readonly onClick?: (option: ComboboxOption) => void;
}

export type ComboboxOption = ComboboxOptionProps;

export interface ComboboxContentProps {
  /**
   * The selected options of the Combobox.
   */
  readonly selected: ComboboxOption[];

  /**
   * The encapsulating noun for the content of the combobox. Used
   * in the empty state, and search placeholder. Should be pluralized.
   */
  readonly subjectNoun?: string;

  /**
   * Action elements to be displayed at the bottom of the list.
   */
  readonly actionElements?: ReactElement[];

  /**
   * State setter for the selected options.
   */
  readonly selectedStateSetter: (selection: ComboboxOption[]) => void;

  /**
   * Callback function to be called when an option is selected.
   */
  readonly handleSelection: (option: ComboboxOption) => void;

  /**
   * Are multiple selections permitted.
   */
  readonly multiselect?: boolean;

  /**
   * The current search term.
   */
  readonly searchValue: string;

  /**
   * Setter for the current search term.
   */
  readonly setSearchValue: Dispatch<SetStateAction<string>>;

  /**
   * Function called when search input changes.
   */
  readonly handleSearchChange: (value: string) => void;

  /**
   * Callback to load more options, this is called when the user scrolls to the bottom of the list.
   */
  readonly onLoadMore?: () => void;

  /**
   * Reference to the wrapping div element of all the Combobox pieces
   */
  readonly wrapperRef: React.RefObject<HTMLDivElement>;

  /**
   * Is the Combobox open
   */
  readonly open: boolean;

  /**
   * The full set of options for the Combobox in the shape of data, not elements.
   */
  readonly options: ComboboxOption[];

  /**
   * Should loading state be shown.
   */
  readonly loading?: boolean;
}

export interface ComboboxSearchProps {
  /**
   * The placeholder for the search input.
   */
  placeholder?: string;

  /**
   * The value of the search input
   */
  searchValue: string;

  /**
   * The open state of the Combobox listbox.
   */
  open: boolean;

  /**
   * Setter for the search input value.
   */
  setSearchValue: Dispatch<SetStateAction<string>>;

  /**
   * Function called when search input changes.
   */
  readonly handleSearchChange: (value: string) => void;
}

export interface ComboboxHeaderProps {
  /**
   * Does the Combobox have any options visible in the list.
   */
  readonly hasOptionsVisible: boolean;
  /**
   * The noun to be used in the header label.
   */
  readonly subjectNoun?: string;

  /**
   * The number of selected options.
   */
  readonly selectedCount: number;

  /**
   * The function to call when the clear all button is clicked.
   */
  readonly onClearAll: () => void;

  /**
   * The function to call when the select all button is clicked.
   */
  readonly onSelectAll: () => void;
}
export interface ComboboxListProps {
  /**
   * The options to display in the list. May be the full set of the Combobox or could be filtered.
   */
  readonly options: ComboboxOption[];

  /**
   * The currently selected options.
   */
  readonly selected: ComboboxOption[];

  /**
   * A ref to the list element.
   */
  readonly optionsListRef: React.RefObject<HTMLUListElement>;

  /**
   * The current search term. Used in the no results message.
   */
  readonly searchValue: string;

  /**
   * Determines if it is a single selection or multi selection Combobox.
   */
  readonly multiselect?: boolean;

  /**
   * The noun to be used in the empty state message.
   */
  readonly subjectNoun?: string;

  /**
   * Should loading state be shown.
   */
  readonly loading?: boolean;

  /**
   * Callback to load more options, this is called when the user scrolls to the bottom of the list.
   */
  readonly onLoadMore?: () => void;
}

export interface ComboboxActionProps {
  /**
   * The function to call when the action is clicked.
   */
  onClick(
    event: React.MouseEvent<HTMLButtonElement>,
    options: ComboboxActionCallbackOptions,
  ): void;

  /**
   * The label text of the action.
   */
  readonly label: string | ((options: ComboboxActionCallbackOptions) => string);

  /**
   * Determine if the action is visible for a given item.
   */
  readonly visible?:
    | boolean
    | ((options: ComboboxActionCallbackOptions) => boolean);

  /**
   * Keeps the Combobox open when the action is clicked.
   * @default false
   */
  readonly keepOpenOnClick?: boolean;
}

export interface ComboboxActionCallbackOptions {
  readonly searchValue: string;
}
