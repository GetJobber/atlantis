import React from "react";
import styles from "./InternalChipDismissible.css";
import { useInternalChipDismissible } from "./hooks";
import { InternalChipDismissibleInput } from "./InternalChipDismissibleInput";
import { InternalChipDismissibleProps } from "./InternalChipDismissibleTypes";
import { ChipDismissible } from "../ChipDismissible";

export function InternalChipDismissible(props: InternalChipDismissibleProps) {
  const {
    availableChipOptions,
    ref: wrapperRef,
    sortedVisibleChipOptions,
    handleChipClick,
    handleChipAdd,
    handleChipRemove,
    handleCustomAdd,
    handleEmptyBackspace,
  } = useInternalChipDismissible(props);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-testid="dismissible-chips"
    >
      {sortedVisibleChipOptions.map(chip => (
        <ChipDismissible
          key={chip.value}
          {...chip}
          onClick={handleChipClick(chip.value)}
          onRequestRemove={handleChipRemove(chip)}
        />
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
