import React from "react";
import styles from "./InternalChip.css";
import { InternalChip } from "./InternalChip";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { useAssert } from "./useAssert";
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
  assertSelectedAndValueType();

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
              data-testid="chip-input"
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

  function isChipSelected(value: string | number) {
    return selected.some((val: string | number) => val === value);
  }

  function handleClick(value: string | number) {
    return (event: React.MouseEvent<HTMLInputElement>) =>
      onClickChip?.(event, value);
  }

  function handleChange(value: string | number) {
    return () => {
      if (isChipSelected(value)) {
        handleDeselect(value);
      } else {
        handleSelect(value);
      }
    };
  }

  function handleSelect<T extends string | number>(value: T) {
    const newVal = [...selected, value] as T[];
    (onChange as (value: T[]) => void)(newVal);
  }

  function handleDeselect<T extends string | number>(value: T) {
    const values = selected as T[];
    const newVal = values.filter(val => val !== value);
    (onChange as (value: T[]) => void)(newVal);
  }

  function checkmarkIcon(show: boolean) {
    if (!show) return;
    return <Icon name="checkmark" />;
  }

  function assertSelectedAndValueType() {
    const chipValues = children.map(child => child.props.value);
    const type = typeof selected[0];
    const typeDidNotMatch = !chipValues.every(val => typeof val === type);

    useAssert(
      selected.length > 0 && typeDidNotMatch,
      `Atleast one of the <Chip /> value prop doesn't match the type of the <Chips> selected prop type of ${type}`,
      { warn: true },
    );
  }
}
