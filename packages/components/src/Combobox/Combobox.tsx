import React, { useEffect, useState } from "react";
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

export function Combobox(props: ComboboxProps): JSX.Element {
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(props.children);
  const [internalSelected, setInternalSelected] = useState<ComboboxOption[]>(
    props.selected,
  );
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

  // all the props of combobox content move up a level if they are needed from the user
  // options --
  // children -- ???
  // searchPlaceholder ++
  // selected ++
  // subjectNoun ++
  // onClose ++
  // onSelect ++

  // what can be pulled out of the context?
  // wrapperRef, we now just have that here if we want it
  // open? no we still need that
  // setOpen too - the trigger needs this
  // multiselect is just a prop here that can be passed in and down

  return (
    <ComboboxContextProvider
      multiselect={props.multiSelect}
      selectedOptions={selectedOptions}
      selectionHandler={handleSelection}
      open={open}
      setOpen={setOpen}
    >
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
      />
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
