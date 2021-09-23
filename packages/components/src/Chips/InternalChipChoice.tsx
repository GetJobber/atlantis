import React from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip } from "./InternalChip";
import { ChipChoiceProps } from "./ChipsTypes";

type InternalChipChoiceProps = Pick<
  ChipChoiceProps,
  "selected" | "onChange" | "children"
>;

export function InternalChipChoice({
  children,
  selected,
  onChange,
}: InternalChipChoiceProps) {
  return (
    <div className={styles.wrapper}>
      {React.Children.map(children, child => (
        <InternalChip
          {...child.props}
          active={child.props.value === selected}
          onClick={() => handleClick(child.props.value)}
          warnOnLongLabels={true}
        />
      ))}
    </div>
  );

  function handleClick(value?: string | number) {
    const newValue = value !== selected ? value : undefined;
    onChange(newValue);
  }
}
