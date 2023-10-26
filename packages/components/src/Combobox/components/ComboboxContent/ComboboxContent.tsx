import React from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import styles from "./ComboboxContent.css";
import { ComboboxContentSearch } from "./ComboboxContentSearch";
import { ComboboxContentList } from "./ComboboxContentList";
import { ComboboxContentHeader } from "./ComboboxContentHeader";
import { useComboboxContent } from "../../hooks/useComboboxContent";
import { useComboboxAccessibility } from "../../hooks/useComboboxAccessibility";
import { ComboboxContentProps } from "../../Combobox.types";

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const options = props.optionElements
    ? props.optionElements.map(option => {
        return {
          id: option.props.id,
          label: option.props.label,
        };
      })
    : [];
  const optionsExist = options.length > 0;

  const { setFirstSelectedElement, filteredOptions, optionsListRef } =
    useComboboxContent(options, props.open, props.selected, props.searchValue);

  const { popperRef, popperStyles, attributes } = useComboboxAccessibility(
    props.handleSelection,
    filteredOptions,
    optionsListRef,
    props.open,
    props.setOpen,
    props.wrapperRef,
  );

  const template = (
    <div
      ref={popperRef}
      id="ATL-Combobox-Content"
      data-testid="ATL-Combobox-Content"
      tabIndex={0}
      className={classnames(styles.content, { [styles.hidden]: !props.open })}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <ComboboxContentSearch
        open={props.open}
        placeholder={props.subjectNoun}
        searchValue={props.searchValue}
        setSearchValue={props.setSearchValue}
      />

      {props.multiselect && optionsExist && (
        <ComboboxContentHeader
          hasOptionsVisible={filteredOptions.length > 0}
          subjectNoun={props.subjectNoun}
          selectedCount={props.selected.length}
          onClearAll={() => {
            props.selectedStateSetter([]);
          }}
          onSelectAll={() => {
            props.selectedStateSetter(filteredOptions);
          }}
        />
      )}
      {/* we will receive all the options but we only render the ones that match the filter */}
      {/* how does that work? */}
      {/* we'll need to intercept the full list before here */}
      {/* then this thing can be simple and say yeah sure I'll render what you gave me */}
      {/* we just have to make sure to give it the right stuff */}
      <ComboboxContentList
        multiselect={props.multiselect}
        showEmptyState={!optionsExist}
        options={filteredOptions}
        selected={props.selected}
        optionsListRef={optionsListRef}
        setFirstSelectedElement={setFirstSelectedElement}
        searchValue={props.searchValue}
        subjectNoun={props.subjectNoun}
      />
      {props.actionElements && (
        <div className={styles.actions} role="group">
          {props.actionElements.map((child, index, childrenArray) => (
            <div
              key={index}
              className={classnames({
                [styles.actionPadding]: index === childrenArray.length - 1,
              })}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return ReactDOM.createPortal(template, document.body);
}
