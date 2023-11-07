import React, { useMemo } from "react";
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

  const options = useMemo(
    () =>
      optionElements
        ? optionElements.map(option => {
            return {
              id: option.props.id,
              label: option.props.label,
            };
          })
        : [],
    [optionElements],
  );

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
      selected={selectedOptions}
      selectionHandler={handleSelection}
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      shouldScroll={shouldScroll}
    >
      <div ref={wrapperRef} className={styles.wrapper}>
        {open && (
          <div
            className={styles.overlay}
            onClick={() => handleClose()}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {triggerElement || (
          <ComboboxTrigger label={props.label} selected={props.selected} />
        )}
        <ComboboxContent
          multiselect={props.multiSelect}
          searchPlaceholder={props.searchPlaceholder}
          subjectNoun={props.subjectNoun}
          selected={selectedOptions}
          actionElements={actionElements}
          selectedStateSetter={selectedStateSetter}
          handleSelection={handleSelection}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          wrapperRef={wrapperRef}
          open={open}
          setOpen={setOpen}
          options={options}
        />
      </div>
    </ComboboxContextProvider>
  );
}

Combobox.Activator = ComboboxActivator;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOptionComponent;
