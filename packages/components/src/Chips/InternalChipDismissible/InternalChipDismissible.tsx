import React from "react";
import styles from "./InternalChipDismissible.css";
import { InternalChipDismissibleInput } from "./components";
import { useInternalChipDismissible } from "./hooks";
import { ChipDismissible } from "..";
import { ChipDismissibleProps } from "../ChipsTypes";

export function InternalChipDismissible(props: ChipDismissibleProps) {
  const {
    availableChipOptions,
    sortedVisibleChipOptions,
    handleChipClick,
    handleChipAdd,
    handleChipRemove,
    handleCustomAdd,
    handleEmptyBackspace,
  } = useInternalChipDismissible(props);

  return (
    <div className={styles.wrapper} data-testid="dismissible-chips">
      {sortedVisibleChipOptions.map(chip => (
        <ChipDismissible
          key={chip.value}
          {...chip}
          onClick={handleChipClick(chip.value)}
          onRequestRemove={handleChipRemove(chip.value)}
        />
      ))}

      <InternalChipDismissibleInput
        activator={props.activator}
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
