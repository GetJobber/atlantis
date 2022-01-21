import React, { useEffect } from "react";
import { debounce } from "lodash";
import classNames from "classnames";
import styles from "./InternalChipDismissible.css";
import { ChipDismissibleInputProps } from "./InternalChipDismissibleTypes";
import { useDismissibleChipInput, useInView, useScrollToActive } from "./hooks";
import { Text } from "../../Text";
import { Button } from "../../Button";
import { Spinner } from "../../Spinner";

export function InternalChipDismissibleInput(props: ChipDismissibleInputProps) {
  const {
    activator = <Button icon="add" type="secondary" ariaLabel="Add" />,
    isLoadingMore = false,
    onSearch,
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
  } = useDismissibleChipInput(props);

  const menuRef = useScrollToActive(activeIndex);
  const { ref: visibleChildRef, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    onSearch && onSearch(searchValue);
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
        <div ref={menuRef} className={styles.menu} role="listbox" id={menuId}>
          {allOptions.map((option, i) => (
            <button
              key={option.value}
              role="option"
              id={generateDescendantId(i)}
              className={classNames(styles.menuOption, {
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
      )}
    </>
  );
}
