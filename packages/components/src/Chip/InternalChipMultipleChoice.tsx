import React, { ReactElement } from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip } from "./InternalChip";
import { ChipProps } from "./Chip";

interface InternalChipChoiceMultipleProps {
  readonly children: ReactElement<ChipProps>[];
  readonly selected: string[];
  onChange(value: string[]): void;
}

export function InternalChipChoiceMultiple({
  children,
  selected,
  onChange,
}: InternalChipChoiceMultipleProps) {
  return (
    <div className={styles.wrapper}>
      {React.Children.map(children, child => (
        <InternalChip
          {...child.props}
          active={selected.includes(child.props.value)}
          onClick={() => handleClick(child.props.value)}
        />
      ))}
    </div>
  );

  function handleClick(value: string) {
    const isDeselect = selected.includes(value);
    const newValue = isDeselect
      ? selected.filter(val => val !== value)
      : [...selected, value];
    onChange(newValue);
  }
}
