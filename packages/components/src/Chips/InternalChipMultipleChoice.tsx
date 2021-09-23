import React from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip } from "./InternalChip";
import { ChipChoiceMultipleProps } from "./ChipsTypes";
import { ChipIcon } from "./ChipIcon";

type InternalChipChoiceMultipleProps = Pick<
  ChipChoiceMultipleProps,
  "selected" | "onChange" | "children" | "onClickChip"
>;

export function InternalChipChoiceMultiple({
  children,
  selected,
  onChange,
  onClickChip,
}: InternalChipChoiceMultipleProps) {
  return (
    <div className={styles.wrapper}>
      {React.Children.map(children, child => {
        const isChipActive = selected.includes(child.props.value);
        return (
          <InternalChip
            {...child.props}
            active={isChipActive}
            suffix={checkmarkIcon(isChipActive)}
            warnOnLongLabels={true}
            onClick={event => {
              onClickChip && onClickChip(event, child.props.value);
              handleClick(child.props.value);
            }}
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
