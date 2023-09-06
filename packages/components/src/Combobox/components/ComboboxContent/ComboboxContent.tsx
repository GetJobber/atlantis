import React, { ReactElement, useRef, useState } from "react";
import classnames from "classnames";
import { usePopper } from "react-popper";
import styles from "./ComboboxContent.css";
import { Icon } from "../../../Icon";
import { ComboboxContext } from "../../ComboboxProvider";

interface ComboboxOption {
  id: string;
  label: string;
}

interface ComboboxContentProps {
  /**
   * options for the combobox
   */
  readonly options: ComboboxOption[];

  /**
   * onSelection handler.
   */
  readonly onSelection: (selection: string) => void;

  /**
   * actions
   */
  readonly children: ReactElement | ReactElement[];
}

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { open, setOpen, wrapperRef } = React.useContext(ComboboxContext);

  const popperRef = useRef<HTMLDivElement>(null);
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

  const filteredOptions = props.options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div
      ref={popperRef}
      className={classnames(styles.content, !open && styles.hidden)}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <div className={styles.search}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder={`Search options`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(event)
          }
          value={searchValue}
        />

        {searchValue && (
          <div
            className={styles.triggerIcon}
            onClick={() => setSearchValue("")}
            role="button"
          >
            <Icon name="remove" size="small" />
          </div>
        )}
      </div>

      {filteredOptions.map(option => (
        <button
          className={classnames(
            styles.option,
            option.id === selectedOption && styles.selectedOption,
          )}
          role="button"
          tabIndex={0}
          key={option.id}
          onClick={handleSelection}
          data-value={option.id}
        >
          {option.label}
        </button>
      ))}

      {filteredOptions.length === 0 && <p>No results for {searchValue}</p>}

      {props.children && <div className={styles.actions}>{props.children}</div>}
    </div>
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSelection(event: React.MouseEvent<HTMLButtonElement>) {
    const selected = event.currentTarget.dataset.value;

    if (selected) {
      setSelectedOption(selected);
      props.onSelection(selected);
    }
    setSearchValue("");
    setOpen(false);
  }
}
