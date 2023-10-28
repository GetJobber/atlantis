import React, { useEffect, useRef, useState } from "react";
import { ComboboxOption, ComboboxProps } from "./Combobox.types";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "./components/ComboboxTrigger";
import { useComboboxValidation } from "./hooks/useComboboxValidation";
import { ComboboxOption as ComboboxOptionElement } from "./components/ComboboxOption/ComboboxOption";
import styles from "./Combobox.css";

// eslint-disable-next-line max-statements
export function Combobox(props: ComboboxProps): JSX.Element {
  const waitUntilClose = props.selectionTiming === "onClose";
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(props.children);
  const [internalSelected, setInternalSelected] = useState<ComboboxOption[]>(
    props.selected,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef<boolean>(false);

  const selectedOptions = waitUntilClose ? internalSelected : props.selected;
  const selectedStateSetter = waitUntilClose
    ? setInternalSelected
    : props.onSelect;
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (!open && waitUntilClose) {
      props.onSelect(selectedOptions);
    }
  }, [open, props.selectionTiming, selectedOptions]);

  return (
    <ComboboxContextProvider
      multiselect={props.multiSelect}
      selectedOptions={selectedOptions}
      selectionHandler={handleSelection}
      open={open}
      setOpen={setOpen}
      closeCombobox={closeCombobox}
      shouldScroll={shouldScroll}
    >
      <div ref={wrapperRef}>
        {open && (
          <div
            className={styles.overlay}
            onClick={() => closeCombobox()}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {triggerElement}
        <ComboboxContent
          multiselect={props.multiSelect}
          selected={selectedOptions}
          subjectNoun={props.subjectNoun}
          searchPlaceholder={props.searchPlaceholder}
          actionElements={actionElements}
          optionElements={optionElements}
          selectedStateSetter={selectedStateSetter}
          handleSelection={handleSelection}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          wrapperRef={wrapperRef}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </ComboboxContextProvider>
  );

  function handleSelection(selection: ComboboxOption) {
    if (props.multiSelect) {
      handleMultiSelect(selectedStateSetter, selectedOptions, selection);
    } else {
      handleSingleSelect(selectedStateSetter, selection);
    }
  }

  function handleSingleSelect(
    selectCallback: (selected: ComboboxOption[]) => void,
    selection: ComboboxOption,
  ) {
    selectCallback([selection]);
    closeCombobox();
  }

  function closeCombobox() {
    setOpen(false);
    setSearchValue("");

    props.onClose && props.onClose();

    if (selectedOptions.length > 0) {
      shouldScroll.current = true;
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

Combobox.TriggerButton = ComboboxTriggerButton;
Combobox.TriggerChip = ComboboxTriggerChip;
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOptionElement;
