import React, { useEffect } from "react";
import classNames from "classnames";
import { FloatingPortal } from "@floating-ui/react";
import styles from "./InternalChipDismissible.module.css";
import type { ChipDismissibleInputProps } from "./InternalChipDismissibleTypes";
import {
  useInView,
  useInternalChipDismissibleInput,
  useRepositionMenu,
  useScrollToActive,
} from "./hooks";
import { Text } from "../../Text";
import { Button } from "../../Button";
import { Spinner } from "../../Spinner";

// Adding Portal moves it over the limit, but doesn't impact the readabiltiy
// eslint-disable-next-line max-statements
export function InternalChipDismissibleInput(props: ChipDismissibleInputProps) {
  const {
    activator = <Button icon="add" type="secondary" ariaLabel="Add" />,
    attachTo,
    isLoadingMore = false,
    onLoadMore,
    options,
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
    handleFocus,
    handleSearchChange,
    handleCancelBlur,
    handleEnableBlur,
    handleSetActiveOnMouseOver,
    handleKeyDown,
    handleSelectOption,
    handleShowInput,
    handleDebouncedSearch,
  } = useInternalChipDismissibleInput(props);

  const scrollableRef = useScrollToActive(activeIndex);
  const { ref: visibleChildRef, isInView } = useInView<HTMLDivElement>();

  const { styles: floatingStyles, setFloatingRef } =
    useRepositionMenu(attachTo);
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

  const menuContent = (
    <div
      ref={node => {
        setFloatingRef(node);
        scrollableRef.current = node;
      }}
      role="listbox"
      id={menuId}
      className={styles.menu}
      style={floatingStyles.float}
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
  );

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
        onFocus={handleFocus}
        autoFocus={true}
      />

      {shouldShowMenu && <FloatingPortal>{menuContent}</FloatingPortal>}
    </>
  );
}
