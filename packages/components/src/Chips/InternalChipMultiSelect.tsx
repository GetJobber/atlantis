import React from "react";
import styles from "./InternalChip.css";
import { InternalChip } from "./InternalChip";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { Icon } from "../Icon";

type InternalChipChoiceMultipleProps = Pick<
  ChipMultiSelectProps,
  "selected" | "onChange" | "children" | "onClickChip"
>;

export function InternalChipMultiSelect({
  children,
  selected,
  onChange,
  onClickChip,
}: InternalChipChoiceMultipleProps) {
  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {React.Children.map(children, chip => {
        const isChipActive = isChipSelected(chip.props.value);
        return (
          <label data-testid={chip.props.label}>
            <input
              type="checkbox"
              checked={isChipActive}
              className={styles.input}
              onClick={handleClick(chip.props.value)}
              onChange={handleChange(chip.props.value)}
              disabled={chip.props.disabled}
            />
            <InternalChip
              {...chip.props}
              active={isChipActive}
              suffix={checkmarkIcon(isChipActive)}
              warnOnLongLabels={true}
            />
          </label>
        );
      })}
    </div>
  );

  function isChipSelected(value: string) {
    return selected.includes(value);
  }

  function handleClick(value: string) {
    return (event: React.MouseEvent<HTMLInputElement>) =>
      onClickChip?.(event, value);
  }

  function handleChange(value: string) {
    return () => {
      if (isChipSelected(value)) {
        handleDeselect(value);
      } else {
        handleSelect(value);
      }
    };
  }

  function handleSelect(value: string) {
    const newVal = [...selected, value];
    onChange(newVal);
  }

  function handleDeselect(value: string) {
    const values = selected;
    const newVal = values.filter(val => val !== value);
    onChange(newVal);
  }

  function checkmarkIcon(show: boolean) {
    if (!show) return;
    return <Icon name="checkmark" />;
  }
}
