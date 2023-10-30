import { Dispatch, ReactElement, SetStateAction } from "react";
import { XOR } from "ts-xor";
import { ButtonProps } from "../Button";

export interface ComboboxProps {
  readonly children: ReactElement | ReactElement[];

  /**
   * When `true`, `Combobox` will allow for multiple selections
   *
   * @default false
   */
  readonly multiSelect?: boolean;

  /**
   * The Chip heading for the trigger
   */
  readonly heading?: string;
}

export interface ComboboxTriggerProps {
  /**
   * The label text of the trigger.
   */
  readonly label: string;
}

export interface ComboboxTriggerButtonProps
  extends ComboboxTriggerProps,
    Pick<ButtonProps, "type" | "variation" | "icon" | "iconOnRight"> {}

export type ComboboxTriggerChipProps = ComboboxTriggerProps;

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

interface ComboboxCloseProps {
  /**
   * Callback function invoked upon the selection of an option. Provides the selected option(s) as an argument.
   */
  readonly onSelect: (selection: ComboboxOption[]) => void;
}

interface ComboboxSelectProps {
  /**
   * Callback function invoked upon the Combobox menu closing. Provides the selected option(s) as an argument.
   */
  readonly onClose: (selection: ComboboxOption[]) => void;
}

interface ComboboxContentBaseProps {
  /**
   * List of selectable options to display.
   */
  readonly options: ComboboxOption[];

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
}

export type ComboboxContentProps = ComboboxContentBaseProps &
  XOR<ComboboxCloseProps, ComboboxSelectProps>;

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
   * Setter for the first selected element, which is used to scroll the list to the first selected element on re-opening.
   */
  readonly setFirstSelectedElement: React.Dispatch<
    SetStateAction<HTMLElement | null>
  >;

  /**
   * The callback function to call when an option is selected.
   */
  readonly selectionHandler: (option: ComboboxOption) => void;

  /**
   * The current search term. Used in the no results message.
   */
  readonly searchValue: string;

  /**
   * Determines if it is a single selection or multi selection Combobox.
   */
  readonly multiselect: boolean;

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
