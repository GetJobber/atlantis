import React from "react";
import { debounce } from "lodash";
import classNames from "classnames";
import styles from "./InternalChipDismissible.css";
import {
  KeyDownCallBacks,
  useDismissibleChipKeydown,
} from "./useDismissibleChipKeydown";
import { useDismissibleChipInput } from "./useDismissibleChipInput";
import { ChipDismissibleInputProps } from "./InternalChipDismissibleTypes";
import { useScrollToActive } from "./useScrollToActive";
import { Text } from "../../Text";
import { Button } from "../../Button";

export function InternalChipDismissibleInput({
  options,
  onEmptyBackspace,
  onCustomOptionSelect,
  onOptionSelect,
}: ChipDismissibleInputProps) {
  const {
    activeOption,
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
    handleReset,
    handleSearchChange,
    handleCancelBlur,
    handleEnableBlur,
    handleSetActiveOnMouseOver,
    setActiveIndex,
  } = useDismissibleChipInput(options);

  const menuRef = useScrollToActive(activeIndex);

  if (!menuOpen) {
    return (
      <Button
        icon="add"
        type="secondary"
        size="small"
        ariaLabel="Add" // FIXME
        onClick={handleOpenMenu}
      />
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-owns={menuId}
        aria-expanded={hasAvailableOptions}
        aria-activedescendant={generateDescendantId(activeIndex)}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown()}
        onBlur={debounce(handleBlur, 200)}
        onFocus={handleOpenMenu}
        autoFocus={true}
      />

      {hasAvailableOptions && (
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
              {option.prefix}
              <Text>{option.label}</Text>
            </button>
          ))}
        </div>
      )}
    </>
  );

  function handleSelectOption(selected: typeof activeOption) {
    const setValue = selected.custom ? onCustomOptionSelect : onOptionSelect;
    setValue(selected.value);
    handleReset();
    inputRef.current?.focus();
  }

  function handleKeyDown() {
    const callbacks: KeyDownCallBacks = {
      Enter: () => handleSelectOption(activeOption),
      Tab: () => handleSelectOption(activeOption),
      ArrowDown: () => {
        const newIndex =
          activeIndex < allOptions.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(newIndex);
      },
      ArrowUp: () => {
        const newIndex =
          activeIndex > 0 ? activeIndex - 1 : allOptions.length - 1;
        setActiveIndex(newIndex);
      },
    };

    if (searchValue.length === 0) {
      callbacks.Backspace = () => onEmptyBackspace();
    }

    return useDismissibleChipKeydown(callbacks);
  }
}
