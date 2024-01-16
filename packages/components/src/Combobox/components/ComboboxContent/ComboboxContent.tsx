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
  const { optionsListRef } = useComboboxContent(props.open, props.selected);

  const { popperRef, popperStyles, attributes } = useComboboxAccessibility(
    props.handleSelection,
    props.options,
    optionsListRef,
    props.open,
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

      {props.multiselect && props.hadInitialOptions && (
        <ComboboxContentHeader
          hasOptionsVisible={props.options.length > 0}
          subjectNoun={props.subjectNoun}
          selectedCount={props.selected.length}
          onClearAll={() => {
            props.selectedStateSetter([]);
          }}
          onSelectAll={() => {
            props.selectedStateSetter(props.options);
          }}
        />
      )}
      <ComboboxContentList
        multiselect={props.multiselect}
        showEmptyState={!props.hadInitialOptions}
        options={props.options}
        selected={props.selected}
        optionsListRef={optionsListRef}
        searchValue={props.searchValue}
        subjectNoun={props.subjectNoun}
        loading={props.loading}
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
