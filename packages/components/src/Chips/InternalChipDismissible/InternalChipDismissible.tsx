import React from "react";
import { Icon } from "@jobber/components/Icon";
import styles from "./InternalChipDismissible.css";
import { useInternalChipDismissible } from "./hooks";
import { InternalChipDismissibleInput } from "./InternalChipDismissibleInput";
import { InternalChipDismissibleProps } from "./InternalChipDismissibleTypes";
import { Chip } from "../../Chip";

export function InternalChipDismissible(props: InternalChipDismissibleProps) {
  const {
    availableChipOptions,
    ref: wrapperRef,
    sortedVisibleChipOptions,
    handleChipAdd,
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
        <Chip
          key={chip.value}
          {...chip}
          onKeyDown={handleChipKeyDown(chip.value)}
          onClick={handleChipRemove(chip.value)}
          ariaLabel={`${chip.label}. Press delete or backspace to remove ${chip.label}`}
          tabIndex={0}
        >
          <Chip.Suffix>
            <Icon name="cross" size="small" />
          </Chip.Suffix>
        </Chip>
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
