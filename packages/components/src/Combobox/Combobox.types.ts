import { Dispatch, ReactElement, SetStateAction } from "react";

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
   * Trigger to load more options. When provided, the Combobox will display a trigger at the bottom of the list of currently visible options.
   */
  readonly loadMoreTrigger?: ReactElement;

  /**
   * The Chip heading for the trigger
   */
  readonly label?: string;

  /**
   * Should the Combobox display the loading state.
   */
  readonly loading?: boolean;
}

export interface ComboboxActivatorProps {
  readonly children: React.ReactElement;
}

export interface ComboboxTriggerProps
  extends Pick<ComboboxContentProps, "selected"> {
  readonly label?: string;
}

export interface ComboboxOption {
  /**
   * A unique identifier for the option.
   */
  id: string | number;

  /**
   * The value to be visually displayed in the Combobox options list.
   */
  label: string;
}

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
   * Trigger to load more options. When provided, the Combobox will display a trigger at the bottom of the list of currently visible options.
   */
  readonly loadMoreTrigger?: ReactElement;

  /**
   * Reference to the wrapping div element of all the Combobox pieces
   */
  readonly wrapperRef: React.RefObject<HTMLDivElement>;

  /**
   * Is the Combobox open
   */
  readonly open: boolean;

  /**
   * Setter for the open state of the Combobox.
   */
  readonly setOpen: (open: boolean) => void;

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
   * Trigger to load more options. When provided, the Combobox will display a trigger at the bottom of the list of currently visible options.
   */
  readonly loadMoreTrigger?: ReactElement;

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
}

export interface ComboboxActionCallbackOptions {
  readonly searchValue: string;
}
