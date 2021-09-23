import React from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip } from "./InternalChip";
import { ChipChoiceMultipleProps } from "./ChipsTypes";

type InternalChipChoiceMultipleProps<T> = Pick<
  ChipChoiceMultipleProps<T>,
  "selected" | "onChange" | "children"
>;

export function InternalChipChoiceMultiple<T>({
  children,
  selected,
  onChange,
}: InternalChipChoiceMultipleProps<T>) {
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

  function handleClick(value: T) {
    const isDeselect = selected.includes(value);
    const newValue = isDeselect
      ? selected.filter(val => val !== value)
      : [...selected, value];
    onChange(newValue);
  }
}
