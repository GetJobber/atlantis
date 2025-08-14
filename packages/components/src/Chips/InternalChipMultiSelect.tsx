import type { MouseEvent } from "react";
import React from "react";
import classNames from "classnames";
import styles from "./InternalChip.module.css";
import { InternalChip } from "./InternalChip";
import type { ChipMultiSelectProps } from "./ChipsTypes";
import { useInternalChips } from "./hooks/useInternalChip";

type InternalChipChoiceMultipleProps = Pick<
  ChipMultiSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "showSelectedSuffix"
>;

export function InternalChipMultiSelect({
  children,
  selected,
  showSelectedSuffix = true,
  onChange,
  onClick,
}: InternalChipChoiceMultipleProps) {
  const { getSuffixProps } = useInternalChips();

  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {React.Children.map(children, chip => {
        const isChipActive = isChipSelected(chip.props.value);
        const suffixProps = getSuffixProps(isChipActive, showSelectedSuffix);
        const classes = classNames(styles.input, {
          [styles.disabled]: chip.props.disabled,
          [styles.invalid]: chip.props.invalid,
          [styles.inactive]: !isChipActive,
        });

        return (
          <label>
            <input
              type="checkbox"
              checked={isChipActive}
              className={classes}
              onClick={handleClick(chip.props.value)}
              onChange={handleChange(chip.props.value)}
              disabled={chip.props.disabled}
            />
            <InternalChip
              {...chip.props}
              active={isChipActive}
              {...suffixProps}
              tabIndex={-1}
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
