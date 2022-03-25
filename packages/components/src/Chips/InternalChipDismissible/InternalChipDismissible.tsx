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
    handleEmptyBackspace,
    handleWrapperKeyDown,
  } = useInternalChipDismissible(props);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-testid="dismissible-chips"
      onKeyDown={handleWrapperKeyDown}
    >
      {sortedVisibleChipOptions.map(chip => (
        <InternalChip
          key={chip.value}
          {...chip}
          onKeyDown={handleChipKeyDown(chip.value)}
          onClick={handleChipClick(chip.value)}
          suffix={
            <InternalChipButton
              icon="remove"
              {...chip}
              onClick={handleChipRemove(chip.value)}
            />
          }
        >
          <span className={styles.visuallyHidden}>
            Press delete to remove chip
          </span>
        </InternalChip>
      ))}

      <InternalChipDismissibleInput
        activator={props.activator}
        attachTo={wrapperRef}
        isLoadingMore={props.isLoadingMore}
        options={availableChipOptions}
        onOptionSelect={handleChipAdd}
        onCustomOptionSelect={handleCustomAdd}
        onEmptyBackspace={handleEmptyBackspace}
        onSearch={props.onSearch}
        onLoadMore={props.onLoadMore}
      />
    </div>
  );
}
