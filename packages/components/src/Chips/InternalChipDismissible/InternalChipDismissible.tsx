import React from "react";
import styles from "./InternalChipDismissible.css";
import { useInternalChipDismissible } from "./hooks";
import { InternalChipDismissibleInput } from "./InternalChipDismissibleInput";
import { InternalChipDismissibleProps } from "./InternalChipDismissibleTypes";
import { InternalChip } from "../InternalChip";
import { InternalChipButton } from "../InternalChipButton";

export function InternalChipDismissible(props: InternalChipDismissibleProps) {
  const {
    availableChipOptions,
    ref: wrapperRef,
    sortedVisibleChipOptions,
    handleChipAdd,
    handleChipClick,
    handleChipKeyDown,
    handleChipRemove,
    handleCustomAdd,
    handleWrapperKeyDown,
  } = useInternalChipDismissible(props);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-testid="dismissible-chips"
      onKeyDown={handleWrapperKeyDown}
      role="listbox"
    >
      {sortedVisibleChipOptions.map(chip => (
        <InternalChip
          key={chip.value}
          {...chip}
          onKeyDown={handleChipKeyDown(chip.value)}
          onClick={handleChipClick(chip.value)}
          ariaLabel={`${chip.label}. Press delete or backspace to remove ${chip.label}`}
          tabIndex={0}
          suffix={
            <InternalChipButton
              icon="remove"
              invalid={chip.invalid}
              disabled={chip.disabled}
              label={chip.label}
              onClick={handleChipRemove(chip.value)}
            />
          }
        />
      ))}

      <InternalChipDismissibleInput
        activator={props.activator}
        attachTo={wrapperRef}
        isLoadingMore={props.isLoadingMore}
        options={availableChipOptions}
        onOptionSelect={handleChipAdd}
        onCustomOptionSelect={handleCustomAdd}
        onSearch={props.onSearch}
        onLoadMore={props.onLoadMore}
      />
    </div>
  );
}
