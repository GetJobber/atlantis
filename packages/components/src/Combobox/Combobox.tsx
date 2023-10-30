import React from "react";
import { ComboboxProps } from "./Combobox.types";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "./components/ComboboxTrigger";
import { ComboboxOption as ComboboxOptionComponent } from "./components/ComboboxOption/ComboboxOption";
import styles from "./Combobox.css";
import { useCombobox } from "./hooks/useCombobox";

export function Combobox(props: ComboboxProps): JSX.Element {
  const {
    actionElements,
    optionElements,
    triggerElement,
    selectedOptions,
    selectedStateSetter,
    shouldScroll,
    wrapperRef,
    searchValue,
    setSearchValue,
    open,
    setOpen,
    handleClose,
    handleSelection,
  } = useCombobox(
    props.children,
    props.selected,
    props.onSelect,
    props.selectionTiming,
    props.onClose,
    props.multiSelect,
  );

  return (
    <ComboboxContextProvider
      multiselect={props.multiSelect}
      selectedOptions={selectedOptions}
      selectionHandler={handleSelection}
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      shouldScroll={shouldScroll}
    >
      <div ref={wrapperRef}>
        {open && (
          <div
            className={styles.overlay}
            onClick={() => handleClose()}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {triggerElement}
        <ComboboxContent
          multiselect={props.multiSelect}
          searchPlaceholder={props.searchPlaceholder}
          subjectNoun={props.subjectNoun}
          selected={selectedOptions}
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
}

Combobox.TriggerButton = ComboboxTriggerButton;
Combobox.TriggerChip = ComboboxTriggerChip;
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOptionComponent;
