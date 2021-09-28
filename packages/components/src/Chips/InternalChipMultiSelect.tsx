import React from "react";
import styles from "./InternalChip.css";
import { InternalChip } from "./InternalChip";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { Icon } from "../Icon";

type InternalChipChoiceMultipleProps<T> = Pick<
  ChipMultiSelectProps<T>,
  "selected" | "onChange" | "children" | "onClickChip"
>;

export function InternalChipMultiSelect<T>({
  children,
  selected,
  onChange,
  onClickChip,
}: InternalChipChoiceMultipleProps<T>) {
  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {React.Children.map(children, child => {
        const isChipActive = selected.includes(child.props.value);
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

  function handleClick(value: T) {
    return (event: React.MouseEvent<HTMLInputElement>) => {
      onClickChip?.(event, value);
      const shouldDeselect = selected.includes(value);
      const newValue = shouldDeselect
        ? selected.filter(val => val !== value)
        : [...selected, value];
      onChange(newValue);
    };
  }

  function checkmarkIcon(show: boolean) {
    if (!show) return;
    return <Icon name="checkmark" />;
  }
}
