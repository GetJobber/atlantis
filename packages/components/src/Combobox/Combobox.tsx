import React from "react";
import { ComboboxProps } from "./Combobox.types";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import { ComboboxTrigger } from "./components/ComboboxTrigger";
import { ComboboxOption as ComboboxOptionComponent } from "./components/ComboboxOption/ComboboxOption";
import styles from "./Combobox.css";
import { useCombobox } from "./hooks/useCombobox";
import { ComboboxActivator } from "./components/ComboboxActivator";
import { useComboboxValidation } from "./hooks/useComboboxValidation";

export function Combobox(props: ComboboxProps): JSX.Element {
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(props.children);
  const {
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
    props.selected,
    props.onSelect,
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
        {triggerElement || <ComboboxTrigger heading={props.heading} />}
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

Combobox.Activator = ComboboxActivator;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOptionComponent;
