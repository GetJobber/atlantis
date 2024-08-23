import React, { MouseEvent } from "react";
import styles from "./InternalChip.css";
import { InternalChip } from "./InternalChip";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { Icon } from "../Icon";

type InternalChipChoiceMultipleProps = Pick<
  ChipMultiSelectProps,
  "selected" | "onChange" | "children" | "onClick"
>;

export function InternalChipMultiSelect({
  children,
  selected,
  onChange,
  onClick,
}: InternalChipChoiceMultipleProps) {
  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {React.Children.map(children, chip => {
        const isChipActive = isChipSelected(chip.props.value);

        return (
          <label>
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
              {...(isChipActive
                ? { suffix: <Icon size="small" name="checkmark" /> }
                : {})}
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
    return (event: MouseEvent<HTMLInputElement>) => onClick?.(event, value);
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
}
