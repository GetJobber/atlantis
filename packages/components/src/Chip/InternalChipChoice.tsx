import React from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip } from "./InternalChip";
import { ChipChoiceProps } from "./ChipsTypes";

type InternalChipChoiceProps<T> = Pick<
  ChipChoiceProps<T>,
  "selected" | "onChange" | "children"
>;

export function InternalChipChoice<T>({
  children,
  selected,
  onChange,
}: InternalChipChoiceProps<T>) {
  return (
    <div className={styles.wrapper}>
      {React.Children.map(children, child => (
        <InternalChip
          {...child.props}
          active={child.props.value === selected}
          onClick={() => handleClick(child.props.value)}
        />
      ))}
    </div>
  );

  function handleClick(value?: T) {
    const newValue = value !== selected ? value : undefined;
    onChange(newValue);
  }
}
