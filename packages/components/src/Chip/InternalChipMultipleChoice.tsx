import React from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip } from "./InternalChip";
import { ChipChoiceMultipleProps } from "./ChipsTypes";
import { ChipIcon } from "./ChipIcon";

type InternalChipChoiceMultipleProps = Pick<
  ChipChoiceMultipleProps,
  "selected" | "onChange" | "children"
>;

export function InternalChipChoiceMultiple({
  children,
  selected,
  onChange,
}: InternalChipChoiceMultipleProps) {
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
            warnOnLongLabels={true}
          />
        );
      })}
    </div>
  );

  function handleClick(value: string | number) {
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
