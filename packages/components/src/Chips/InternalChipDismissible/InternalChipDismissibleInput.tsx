import React, { useEffect } from "react";
import debounce from "lodash/debounce";
import classNames from "classnames";
import styles from "./InternalChipDismissible.css";
import { ChipDismissibleInputProps } from "./InternalChipDismissibleTypes";
import {
  useInView,
  useInternalChipDismissibleInput,
  useRepositionMenu,
  useScrollToActive,
} from "./hooks";
import { Text } from "../../Text";
import { Button } from "../../Button";
import { Spinner } from "../../Spinner";

export function InternalChipDismissibleInput(props: ChipDismissibleInputProps) {
  const {
    activator = <Button icon="add" type="secondary" ariaLabel="Add" />,
    attachTo,
    isLoadingMore = false,
    onLoadMore,
  } = props;

  const {
    activeIndex,
    allOptions,
    hasAvailableOptions,
    inputRef,
    menuId,
    menuOpen,
    searchValue,
    generateDescendantId,
    handleBlur,
    handleOpenMenu,
    handleSearchChange,
    handleCancelBlur,
    handleEnableBlur,
    handleSetActiveOnMouseOver,
    handleKeyDown,
    handleSelectOption,
    handleDebouncedSearch,
  } = useInternalChipDismissibleInput(props);

  const menuRef = useScrollToActive(activeIndex);
  const { ref: visibleChildRef, isInView } = useInView<HTMLDivElement>();

  const {
    styles: popperStyles,
    attributes,
    update,
    setPositionedElementRef,
  } = useRepositionMenu(attachTo);

  useEffect(() => {
    if (menuOpen && update) update();
  }, [allOptions]);

  useEffect(() => {
    handleDebouncedSearch();
    return handleDebouncedSearch.cancel;
  }, [searchValue]);

  useEffect(() => {
    isInView && onLoadMore && onLoadMore(searchValue);
  }, [isInView]);

  if (!menuOpen) {
    return React.cloneElement(activator, { onClick: handleOpenMenu });
  }

  return (
    <>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        role="combobox"
        aria-label="Press up and down arrow to cycle through the options or type to narrow down the results"
        aria-autocomplete="list"
        aria-owns={menuId}
        aria-expanded={hasAvailableOptions}
        aria-activedescendant={generateDescendantId(activeIndex)}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={debounce(handleBlur, 200)}
        onFocus={handleOpenMenu}
        autoFocus={true}
      />

      {(hasAvailableOptions || isLoadingMore) && (
        <div
          ref={setPositionedElementRef}
          className={styles.menu}
          style={popperStyles.popper}
          {...attributes.popper}
        >
          <div
            ref={menuRef}
            role="listbox"
            id={menuId}
            className={styles.menuList}
            data-testid="chip-menu"
          >
            {allOptions.map((option, i) => (
              <button
                key={option.value}
                role="option"
                type="button"
                id={generateDescendantId(i)}
                className={classNames(styles.menuListOption, {
                  [styles.activeOption]: activeIndex === i,
                })}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={handleSetActiveOnMouseOver(i)}
                onMouseDown={handleCancelBlur}
                onMouseUp={handleEnableBlur}
              >
                <span aria-hidden>{option.prefix}</span>
                <Text>{option.label}</Text>
              </button>
            ))}

            <div ref={visibleChildRef} />

            {isLoadingMore && (
              <div className={styles.loadingIndicator}>
                <Spinner size="small" inline />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
