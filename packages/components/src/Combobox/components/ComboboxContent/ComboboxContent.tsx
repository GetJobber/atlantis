import React, { ReactElement, useEffect, useState } from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { XOR } from "ts-xor";
import styles from "./ComboboxContent.css";
import { ComboboxSearch } from "./ComboboxSearch";
import { ComboboxList } from "./ComboboxList";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxOption } from "../../Combobox.types";
import { useComboboxContent } from "../../hooks/useComboboxContent";
import { useComboboxAccessibility } from "../../hooks/useComboboxAccessibility";

interface ComboboxCloseProps {
  /**
   * Callback function invoked upon the selection of an option. Provides the selected option(s) as an argument.
   */
  readonly onSelect: (selection: ComboboxOption[]) => void;
}

interface ComoboboxSelectProps {
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

type ComboboxContentProps = ComboboxContentBaseProps &
  XOR<ComboboxCloseProps, ComoboboxSelectProps>;

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const { open, setOpen, wrapperRef, multiselect } =
    React.useContext(ComboboxContext);
  const optionsExist = props.options.length > 0;

  const {
    searchValue,
    setSearchValue,
    setFirstSelectedElement,
    filteredOptions,
    optionsListRef,
  } = useComboboxContent(props.options, open);

  const { popperRef, popperStyles, attributes } = useComboboxAccessibility(
    handleSelection,
    filteredOptions,
    optionsListRef,
    open,
    setOpen,
    wrapperRef,
  );

  const [internalSelected, setInternalSelected] = useState<ComboboxOption[]>(
    props.selected,
  );
  const selectedOptions = props.onClose ? internalSelected : props.selected;

  useEffect(() => {
    if (!open) {
      props.onClose && props.onClose(selectedOptions);
    }
  }, [open]);

  const template = (
    <div
      ref={popperRef}
      id="ATL-Combobox-Content"
      data-testid="ATL-Combobox-Content"
      tabIndex={0}
      className={classnames(styles.content, { [styles.hidden]: !open })}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <ComboboxSearch
        open={open}
        placeholder={props.subjectNoun}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <ComboboxList
        multiselect={multiselect}
        showEmptyState={!optionsExist}
        options={filteredOptions}
        selected={selectedOptions}
        optionsListRef={optionsListRef}
        setFirstSelectedElement={setFirstSelectedElement}
        selectionHandler={handleSelection}
        searchValue={searchValue}
        subjectNoun={props.subjectNoun}
      />

      {props.children && (
        <div className={styles.actions} role="group">
          {React.Children.toArray(props.children).map(
            (child, index, childrenArray) => (
              <div
                key={index}
                className={classnames({
                  [styles.actionPadding]: index === childrenArray.length - 1,
                })}
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
    const callbackHandler = props.onSelect
      ? props.onSelect
      : setInternalSelected;

    if (multiselect) {
      handleMultiSelect(callbackHandler, selectedOptions, selection);
    } else {
      callbackHandler([selection]);
      setSearchValue("");
      setOpen(false);
    }
  }
}

function handleMultiSelect(
  selectCallback: (selected: ComboboxOption[]) => void,
  selected: ComboboxOption[],
  selection: ComboboxOption,
) {
  if (selected.some(s => s.id === selection.id)) {
    selectCallback(selected.filter(s => s.id !== selection.id));
  } else {
    selectCallback([...selected, selection]);
  }
}
