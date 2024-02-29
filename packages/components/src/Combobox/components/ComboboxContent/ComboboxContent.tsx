import React from "react";
import classnames from "classnames";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { createPortal } from "react-dom";
import styles from "./ComboboxContent.css";
import { ComboboxContentSearch } from "./ComboboxContentSearch";
import { ComboboxContentList } from "./ComboboxContentList";
import { ComboboxContentHeader } from "./ComboboxContentHeader";
import { useComboboxContent } from "../../hooks/useComboboxContent";
import { useComboboxAccessibility } from "../../hooks/useComboboxAccessibility";
import { ComboboxContentProps } from "../../Combobox.types";

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const optionsExist = props.options.length > 0;
  const { optionsListRef } = useComboboxContent(props.open, props.selected);
  const mounted = useIsMounted();

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
        handleSearchChange={props.handleSearchChange}
      />

      {props.multiselect && (optionsExist || props.selected.length > 0) && (
        <ComboboxContentHeader
          hasOptionsVisible={optionsExist}
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
        options={props.options}
        selected={props.selected}
        optionsListRef={optionsListRef}
        searchValue={props.searchValue}
        subjectNoun={props.subjectNoun}
        loading={props.loading}
        onLoadMore={props.onLoadMore}
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

  return mounted ? createPortal(template, document.body) : template;
}
