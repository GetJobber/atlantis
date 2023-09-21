import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import styles from "./ComboboxContent.css";
import { Icon } from "../../../Icon";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxOption } from "../../Combobox.types";

interface ComboboxContentProps {
  /**
   * List of selectable options to display.
   */
  readonly options: ComboboxOption[];

  /**
   * Callback function invoked upon the selection of an option. Provides the selected option as an argument.
   */
  readonly onSelect: (selection: ComboboxOption) => void;

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
   * @optional
   * @type string
   */
  readonly selected?: string | number;

  /**
   * The encapsulating noun for the content of the combobox. Used
   * in the empty state, and search placeholder. Should be pluralized.
   */
  readonly subjectNoun?: string;
}

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const optionsExist = props.options.length > 0;
  const {
    searchValue,
    setSearchValue,
    selectedOption,
    setSelectedOption,
    open,
    setOpen,
    popperRef,
    popperStyles,
    attributes,
    filteredOptions,
    optionsListRef,
  } = useComboboxContent(props.selected, props.options);

  useComboboxAccessibility(
    open,
    handleSelection,
    popperRef,
    filteredOptions,
    optionsListRef,
  );

  const template = (
    <div
      ref={popperRef}
      id="ATL-Combobox-Content"
      data-testid="ATL-Combobox-Content"
      tabIndex={0}
      className={classnames(styles.content, !open && styles.hidden)}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <Search
        open={open}
        placeholder={props.subjectNoun}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ul className={styles.optionsList} role="listbox" ref={optionsListRef}>
        {optionsExist &&
          filteredOptions.map(option => {
            const isSelected =
              option.id.toString() === selectedOption?.id.toString();

            return (
              <li
                key={option.id}
                tabIndex={-1}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelection(option)}
                className={classnames(styles.option, {
                  [styles.selectedOption]: isSelected,
                })}
              >
                {option.label}
              </li>
            );
          })}

        {optionsExist && filteredOptions.length === 0 && (
          <p>No results for {`"${searchValue}"`}</p>
        )}

        {!optionsExist && <p>{getZeroIndexStateText(props.subjectNoun)}</p>}
      </ul>

      {props.children && (
        <div className={styles.actions} role="group">
          {React.Children.toArray(props.children).map(
            (child, index, childrenArray) => (
              <div
                key={index}
                className={
                  index === childrenArray.length - 1 ? styles.actionPadding : ""
                }
              >
                {child}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );

  return ReactDOM.createPortal(template, document.body);

  function handleSelection(selection: ComboboxOption) {
    setSelectedOption(selection);
    props.onSelect(selection);
    setSearchValue("");
    setOpen(false);
  }
}

function Search(props: {
  placeholder?: string;
  searchValue: string;
  open: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 0);
    }
  }, [props.open]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        ref={searchRef}
        className={styles.searchInput}
        placeholder={
          props.placeholder ? `Search ${props.placeholder}` : "Search"
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(event)
        }
        value={props.searchValue}
      />

      {props.searchValue && (
        <button
          className={styles.clearSearch}
          onClick={clearSearch}
          data-testid="ATL-Combobox-Content-Search-Clear"
          aria-label="Clear search"
        >
          <Icon name="remove" size="small" />
        </button>
      )}
    </div>
  );

  function clearSearch() {
    props.setSearchValue("");
    searchRef.current?.focus();
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    props.setSearchValue(event.target.value);
  }
}

function getZeroIndexStateText(subjectNoun?: string) {
  if (subjectNoun) {
    return `You don't have any ${subjectNoun} yet`;
  }

  return "No options yet";
}

function useComboboxAccessibility(
  open: boolean,
  selectionCallback: (selection: ComboboxOption) => void,
  containerRef: React.RefObject<HTMLDivElement>,
  filteredOptions: ComboboxOption[],
  optionsListRef: React.RefObject<HTMLUListElement>,
): void {
  const hasOptionsVisible = open && filteredOptions.length > 0;
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => setFocusedIndex(null), [open, filteredOptions.length]);

  useEffect(() => {
    if (open) {
      containerRef.current?.addEventListener("keydown", handleContentKeydown);
    }

    return () => {
      containerRef.current?.removeEventListener(
        "keydown",
        handleContentKeydown,
      );
    };
  }, [open, optionsListRef, focusedIndex, filteredOptions]);

  function handleContentKeydown(event: KeyboardEvent) {
    if (!hasOptionsVisible) return;

    if (event.key === "Enter" || event.key === " ") {
      const activeElementInList = optionsListRef.current?.contains(
        document.activeElement,
      );

      if (!activeElementInList) return;

      handleKeyboardSelection(event);
    }
    if (event.key === "ArrowDown") {
      handleKeyboardNavigation(event, 1);
    }
    if (event.key === "ArrowUp") {
      handleKeyboardNavigation(event, -1);
    }
  }

  function handleKeyboardNavigation(event: KeyboardEvent, indexChange: number) {
    if (!hasOptionsVisible) return;

    let newIndex;

    event.preventDefault();

    if (focusedIndex === null) {
      newIndex = 0;
    } else {
      newIndex = focusedIndex + indexChange;

      if (newIndex < 0 || newIndex >= filteredOptions.length) return;
    }
    const optionElement = optionsListRef.current?.children[
      newIndex
    ] as HTMLElement;
    optionElement?.focus();
    setFocusedIndex(newIndex);
  }

  function handleKeyboardSelection(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (focusedIndex !== null) {
      selectionCallback(filteredOptions[focusedIndex]);
    }
  }
}

function useComboboxContent(
  selected: string | number | undefined,
  options: ComboboxOption[],
): {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: ComboboxOption | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<ComboboxOption | null>
  >;
  open: boolean;
  setOpen: (open: boolean) => void;
  popperRef: React.RefObject<HTMLDivElement>;
  popperStyles: { [key: string]: React.CSSProperties };
  attributes: { [key: string]: { [key: string]: string } | undefined };
  filteredOptions: ComboboxOption[];
  optionsListRef: React.RefObject<HTMLUListElement>;
} {
  const defaultValue = options.find(
    option => option.id.toString() === selected?.toString(),
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(
    defaultValue || null,
  );
  const { open, setOpen, wrapperRef } = React.useContext(ComboboxContext);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useOnKeyDown(() => {
    if (open) {
      setOpen(false);
    }
  }, "Escape");

  useRefocusOnActivator(open);

  const optionsListRef = useRef<HTMLUListElement>(null);
  const popperRef = useFocusTrap<HTMLDivElement>(open);
  const { styles: popperStyles, attributes } = usePopper(
    wrapperRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top-start"],
          },
        },
      ],
      placement: "bottom-start",
    },
  );

  return {
    searchValue,
    setSearchValue,
    selectedOption,
    setSelectedOption,
    open,
    setOpen,
    popperRef,
    popperStyles,
    attributes,
    filteredOptions,
    optionsListRef,
  };
}
