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
import { Text } from "../../Text";
import { Button } from "../../Button";

export function InternalChipDismissibleInput({
  options,
  onEmptyBackspace,
  onCustomOptionAdd,
  onOptionSelect,
}: ChipDismissibleInputProps) {
  const {
    activeOption,
    activeIndex,
    allOptions,
    inputRef,
    menuId,
    menuOpen,
    searchValue,
    handleBlur,
    handleOpenMenu,
    handleReset,
    handleSearchChange,
    handleCancelBlur,
    handleEnableBlur,
    setActiveIndex,
  } = useDismissibleChipInput(options);

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
        role="combobox"
        aria-autocomplete="list"
        aria-owns={menuId}
        aria-expanded={menuOpen}
        aria-activedescendant={`${menuId}-${activeIndex}`}
        className={styles.input}
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown()}
        onBlur={debounce(handleBlur, 200)}
        onFocus={handleOpenMenu}
        autoFocus={true}
      />

      {allOptions.length > 0 && (
        <div className={styles.menu} role="listbox" id={menuId}>
          {allOptions.map((option, i) => {
            return (
              <button
                key={option.value}
                role="option"
                id={`${menuId}-${i}`}
                className={classNames(styles.menuOption, {
                  [styles.activeOption]: activeIndex === i,
                })}
                onClick={() => handleSelectOption(option)}
                onMouseDown={handleCancelBlur}
                onMouseUp={handleEnableBlur}
              >
                {option.prefix}
                <Text>{option.label}</Text>
              </button>
            );
          })}
        </div>
      )}
    </>
  );

  function handleSelectOption(selected: typeof activeOption) {
    const setValue = selected.custom ? onCustomOptionAdd : onOptionSelect;
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
