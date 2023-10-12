import { Dispatch, ReactElement, SetStateAction } from "react";
import { XOR } from "ts-xor";
import { ButtonProps } from "../Button";

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
  id: string | number;
  label: string;
}

export interface ComboboxProps {
  readonly children: ReactElement | ReactElement[];

  /**
   * When `true`, `Combobox` will allow for multiple selections
   *
   * @default false
   */
  readonly multiSelect?: boolean;
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

interface ComboboxCloseProps {
  /**
   * Callback function invoked upon the selection of an option. Provides the selected option(s) as an argument.
   */
  readonly onSelect: (selection: ComboboxOption[]) => void;
}

interface ComboboxSelectProps {
  /**
   *
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
   * pre selected option
   * @default ""
   * @type string
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

export interface ComboboxListProps {
  readonly options: ComboboxOption[];
  readonly showEmptyState: boolean;
  readonly selected: ComboboxOption[];
  readonly optionsListRef: React.RefObject<HTMLUListElement>;
  readonly setFirstSelectedElement: React.Dispatch<
    SetStateAction<HTMLElement | null>
  >;
  readonly selectionHandler: (option: ComboboxOption) => void;
  readonly searchValue: string;
  readonly multiselect: boolean;
  readonly subjectNoun?: string;
}

export interface ComboboxSearchProps {
  placeholder?: string;
  searchValue: string;
  open: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
}
