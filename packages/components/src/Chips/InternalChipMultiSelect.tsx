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
      {React.Children.map(children, child => {
        const isChipActive = selected.some(
          (val: string | number) => val === child.props.value,
        );
        return (
          <label data-testid={child.props.label}>
            <input
              type="checkbox"
              checked={isChipActive}
              className={styles.input}
              onClick={handleClick(child.props.value)}
              onChange={() => {
                /* No op. onClick handles the change to allow deselecting. */
              }}
              disabled={child.props.disabled}
              data-testid="chip-input"
            />
            <InternalChip
              {...child.props}
              active={isChipActive}
              suffix={checkmarkIcon(isChipActive)}
              warnOnLongLabels={true}
            />
          </label>
        );
      })}
    </div>
  );

  function handleClick(value: string | number) {
    return (event: React.MouseEvent<HTMLInputElement>) => {
      onClickChip?.(event, value);

      const shouldDeselect = selected.some(
        (val: string | number) => val === value,
      );
      if (shouldDeselect) {
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
    const chipOptionsValues = children.map(child => child.props.value);
    const type = typeof selected[0];
    const isMatching = !chipOptionsValues.every(val => typeof val === type);

    useAssert(
      selected.length > 0 && isMatching,
      `Atleast one of the <Chip /> value prop doesn't match the type of the <Chips> selected prop type of ${type}`,
      { warn: true },
    );
  }
}
