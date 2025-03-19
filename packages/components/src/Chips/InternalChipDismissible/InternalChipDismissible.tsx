import React, { useEffect, useRef } from "react";
import styles from "./InternalChipDismissible.module.css";
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
    setChipRef,
  } = useInternalChipDismissible(props);

  const chipElementsRef = useRef<Map<string, HTMLElement | null>>(new Map());

  // Effect to update refs when chips are rendered
  useEffect(() => {
    // Wait for the DOM to be updated
    setTimeout(() => {
      if (wrapperRef.current) {
        const chipElements =
          wrapperRef.current.querySelectorAll('[role="option"]');

        // Update ref map
        chipElementsRef.current.clear();
        sortedVisibleChipOptions.forEach((chip, index) => {
          const element = chipElements[index] as HTMLElement | undefined;

          if (element) {
            chipElementsRef.current.set(chip.value, element);
            setChipRef(index, element);
          }
        });
      }
    }, 0);
  }, [sortedVisibleChipOptions, setChipRef, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-testid="dismissible-chips"
      onKeyDown={handleWrapperKeyDown}
      role="listbox"
    >
      {sortedVisibleChipOptions.map((chip, index) => (
        <InternalChip
          key={chip.value}
          {...chip}
          onKeyDown={handleChipKeyDown(chip.value, index)}
          onClick={handleChipClick(chip.value)}
          ariaLabel={`${chip.label}. Press delete or backspace to remove ${chip.label}`}
          tabIndex={0}
          suffix={
            <InternalChipButton
              icon="remove"
              invalid={chip.invalid}
              disabled={chip.disabled}
              label={chip.label}
              onClick={handleChipRemove(chip.value, index)}
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
