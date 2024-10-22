import React, { useMemo } from "react";
import { ComboboxProps } from "./Combobox.types";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import { ComboboxTrigger } from "./components/ComboboxTrigger";
import { ComboboxOption as ComboboxOptionComponent } from "./components/ComboboxOption/ComboboxOption";
import styles from "./Combobox.module.css";
import { useCombobox } from "./hooks/useCombobox";
import { ComboboxActivator } from "./components/ComboboxActivator";
import { useComboboxValidation } from "./hooks/useComboboxValidation";

export function Combobox(props: ComboboxProps): JSX.Element {
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(props.children);

  const options = useMemo(
    () =>
      optionElements?.map(option => ({
        id: option.props.id,
        label: option.props.label,
        prefix: option.props.prefix,
      })) || [],
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
    handleClose,
    handleSelection,
    toggleOpen,
    internalFilteredOptions,
    handleSearchChange,
  } = useCombobox(
    props.selected,
    props.onSelect,
    options,
    props.onClose,
    props.multiSelect,
    props.onSearch,
    props.onSearchDebounce,
  );

  return (
    <ComboboxContextProvider
      selected={selectedOptions}
      selectionHandler={handleSelection}
      open={open}
      toggleOpen={toggleOpen}
      handleClose={handleClose}
      shouldScroll={shouldScroll}
      searchValue={searchValue}
      label={props.label}
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
          subjectNoun={props.subjectNoun}
          selected={selectedOptions}
          actionElements={actionElements}
          selectedStateSetter={selectedStateSetter}
          handleSelection={handleSelection}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          wrapperRef={wrapperRef}
          open={open}
          options={props.onSearch ? options : internalFilteredOptions}
          loading={props.loading}
          handleSearchChange={handleSearchChange}
          onLoadMore={props.onLoadMore}
        />
      </div>
    </ComboboxContextProvider>
  );
}

Combobox.Activator = ComboboxActivator;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOptionComponent;
