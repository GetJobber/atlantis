import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
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
import { Text } from "../../../Text";

interface ComboboxContentProps {
  /**
   * List of selectable options to display.
   */
  readonly options: ComboboxOption[];

  /**
   * Callback function invoked upon the selection of an option. Provides the selected option as an argument.
   */
  readonly onSelection: (selection: ComboboxOption) => void;

  /**
   * Optional action button(s) to display at the bottom of the list.
   */
  readonly children?: ReactElement | ReactElement[];

  /**
   * Placeholder text to display in the search input. Defaults to "Search".
   */
  readonly searchPlaceholder?: string;
}

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const {
    searchValue,
    setSearchValue,
    selectedOption,
    setSelectedOption,
    open,
    setOpen,
    actionsRef,
    popperRef,
    popperStyles,
    attributes,
  } = useComboboxContent();

  const filteredOptions = props.options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const template = (
    <div
      ref={popperRef}
      data-testid="ATL-Combobox-Content"
      tabIndex={0}
      className={classnames(styles.content, !open && styles.hidden)}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      {React.Children.toArray(props.children).length > 0 && (
        <SkipToActionsLink actionsRef={actionsRef} />
      )}
      <Search
        searchPlaceholder={props.searchPlaceholder}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={styles.list}>
        {filteredOptions.map(option => (
          <button
            className={classnames(
              styles.option,
              option.id === selectedOption?.id && styles.selectedOption,
            )}
            key={option.id}
            onClick={() => handleSelection(option)}
          >
            {option.label}
          </button>
        ))}

        {filteredOptions.length === 0 && (
          <p>No results for {`"${searchValue}"`}</p>
        )}
      </div>

      {props.children && (
        <div
          className={styles.actions}
          ref={actionsRef}
          data-testid="ATL-Combobox-Content-Actions"
        >
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
    props.onSelection(selection);
    setSearchValue("");
    setOpen(false);
  }
}

function SkipToActionsLink(props: {
  actionsRef: React.RefObject<HTMLDivElement>;
}): JSX.Element {
  return (
    <button
      className={styles.skipToActionsLink}
      data-testid="ATL-Combobox-Content-SkipToActions"
      onClick={() => {
        props.actionsRef.current?.querySelector("button")?.focus();
      }}
    >
      <Text>Skip to Actions</Text>
    </button>
  );
}

function Search(props: {
  searchPlaceholder?: string;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.search}>
      <input
        type="search"
        ref={searchRef}
        className={styles.searchInput}
        placeholder={props.searchPlaceholder || "Search"}
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

function useComboboxContent(): {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: ComboboxOption | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<ComboboxOption | null>
  >;
  open: boolean;
  setOpen: (open: boolean) => void;
  actionsRef: React.RefObject<HTMLDivElement>;
  popperRef: React.RefObject<HTMLDivElement>;
  popperStyles: { [key: string]: React.CSSProperties };
  attributes: { [key: string]: { [key: string]: string } | undefined };
} {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(
    null,
  );
  const { open, setOpen, wrapperRef } = React.useContext(ComboboxContext);

  useOnKeyDown(() => {
    if (open) {
      setOpen(false);
    }
  }, "Escape");

  useRefocusOnActivator(open);

  const actionsRef = useRef<HTMLDivElement>(null);
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
    actionsRef,
    popperRef,
    popperStyles,
    attributes,
  };
}
