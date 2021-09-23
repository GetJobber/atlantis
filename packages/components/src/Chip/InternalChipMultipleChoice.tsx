import React from "react";
import { ChipIcon } from ".";
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
      {React.Children.map(children, child => {
        const isChipActive = selected.includes(child.props.value);
        return (
          <InternalChip
            {...child.props}
            active={isChipActive}
            onClick={() => handleClick(child.props.value)}
            suffix={checkmarkIcon(isChipActive)}
          />
        );
      })}
    </div>
  );

  function handleClick(value: T) {
    const shouldDeselect = selected.includes(value);
    const newValue = shouldDeselect
      ? selected.filter(val => val !== value)
      : [...selected, value];
    onChange(newValue);
  }

  function checkmarkIcon(show: boolean) {
    if (!show) return;
    return <ChipIcon name="checkmark" />;
  }
}
