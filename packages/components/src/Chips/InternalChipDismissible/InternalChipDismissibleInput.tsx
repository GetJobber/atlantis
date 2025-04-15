import React, { useEffect } from "react";
import classNames from "classnames";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import styles from "./InternalChipDismissible.module.css";
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

// eslint-disable-next-line max-statements
export function InternalChipDismissibleInput(props: ChipDismissibleInputProps) {
  const {
    activator = <Button icon="add" type="secondary" ariaLabel="Add" />,
    attachTo,
    isLoadingMore = false,
    onLoadMore,
    options,
    onlyShowMenuOnSearch = false,
  } = props;

  const {
    activeIndex,
    allOptions,
    hasAvailableOptions,
    inputRef,
    menuId,
    menuOpen,
    searchValue,
    showInput,
    generateDescendantId,
    handleBlur,
    handleOpenMenu,
    handleSearchChange,
    handleCancelBlur,
    handleEnableBlur,
    handleSetActiveOnMouseOver,
    handleKeyDown,
    handleSelectOption,
    handleShowInput,
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
  useSafeLayoutEffect(() => {
    update?.();
  }, [allOptions, menuOpen, update, options]);

  useEffect(() => {
    handleDebouncedSearch(searchValue, options);

    return handleDebouncedSearch.cancel;
  }, [searchValue, options]);

  useEffect(() => {
    isInView && onLoadMore && onLoadMore(searchValue);
  }, [isInView]);

  if (!showInput) {
    return React.cloneElement(activator, { onClick: handleShowInput });
  }

  const shouldShowMenu = menuOpen && (hasAvailableOptions || isLoadingMore);

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
        aria-expanded={shouldShowMenu}
        aria-activedescendant={generateDescendantId(activeIndex)}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(handleBlur, 200)}
        onFocus={onlyShowMenuOnSearch ? undefined : handleOpenMenu}
        autoFocus={true}
      />

      {shouldShowMenu && (
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
