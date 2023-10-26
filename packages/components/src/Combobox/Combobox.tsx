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

export function Combobox(props: ComboboxProps): JSX.Element {
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(props.children);
  const [internalSelected, setInternalSelected] = useState<ComboboxOption[]>(
    props.selected,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOptions = props.onClose ? internalSelected : props.selected;
  // is this a good name? it's more of a state setter
  const selectedStateSetter = props.onClose
    ? setInternalSelected
    : props.onSelect;
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (!open && props.onClose) {
      props.onClose(selectedOptions);
    }
  }, [open, props.onClose, selectedOptions]);

  return (
    <ComboboxContextProvider
      multiselect={props.multiSelect}
      selectedOptions={selectedOptions}
      selectionHandler={handleSelection}
      open={open}
      setOpen={setOpen}
    >
      <div ref={wrapperRef}>
        {open && (
          <div
            className={styles.overlay}
            onClick={() => setOpen(false)}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {triggerElement}
        {/* this is now private and can receive whatever */}
        {/* including open and setopen */}
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

      {/* this has to be an array of the options */}
      {/* do we copy them here? */}
      {/* do we have to copy them at all? */}
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
    setSearchValue("");
    setOpen(false);
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
