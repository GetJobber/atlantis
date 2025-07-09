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

const defaultOnSelect = () => undefined;

export function Combobox({
  onSelect = defaultOnSelect,
  ...props
}: ComboboxProps): JSX.Element {
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(props.children);

  const options = useMemo(
    () =>
      optionElements?.map(option => ({
        id: option.props.id,
        label: option.props.label,
        prefix: option.props.prefix,
        customRender: option.props.customRender,
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
    handleOpen,
    internalFilteredOptions,
    handleSearchChange,
  } = useCombobox(
    props.selected,
    onSelect,
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
      handleOpen={handleOpen}
      handleClose={handleClose}
      shouldScroll={shouldScroll}
      searchValue={searchValue}
      label={props.label}
    >
      <div ref={wrapperRef} className={styles.wrapper}>
        {open && (
          <div
            className={styles.overlay}
            onClick={handleClose}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {triggerElement || (
          <ComboboxTrigger
            label={props.label}
            selected={props.selected}
            activatorRef={props.defaultActivatorRef}
          />
        )}
        <ComboboxContent
          multiselect={props.multiSelect}
          subjectNoun={props.subjectNoun}
          selected={selectedOptions}
          actionElements={actionElements}
          selectedStateSetter={selectedStateSetter}
          onSelectAll={props.onSelectAll}
          onClear={props.onClear}
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
