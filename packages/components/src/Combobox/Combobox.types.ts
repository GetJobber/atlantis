import { Dispatch, ReactElement, SetStateAction } from "react";

export interface ComboboxProps {
  readonly children: ReactElement | ReactElement[];

  /**
   * When `true`, `Combobox` will allow for multiple selections
   *
   * @default false
   */
  readonly multiSelect?: boolean;

  /**
   * Placeholder text to display in the search input. Defaults to "Search".
   */
  readonly searchPlaceholder?: string;

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
   * The Chip heading for the trigger
   */
  readonly heading: string;
}

export interface ComboboxActivatorProps {
  readonly children: React.ReactElement;
}

export interface ComboboxTriggerProps {
  /**
   * The heading text of the trigger.
   */
  readonly heading: string;
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
   * Optional action button(s) to display at the bottom of the list.
   */
  readonly children?: ReactElement | ReactElement[];

  /**
   * Placeholder text to display in the search input. Defaults to "Search".
   */
  readonly searchPlaceholder?: string;

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
   * Option elements to display in the list. Filtering may cause this to be a subset of the full set of options.
   */
  readonly optionElements?: ReactElement[];

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
   * Used to determine if the empty state should be shown and given priority over the options list.
   */
  readonly showEmptyState: boolean;

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
}

export interface ComboboxActionProps {
  /**
   * The function to call when the action is clicked.
   */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;

  /**
   * The label text of the action.
   */
  readonly label: string;
}
