import React, { KeyboardEvent, MouseEvent, useId } from "react";
import styles from "./InternalChip.css";
import { InternalChip } from "./InternalChip";
import { ChipSingleSelectProps } from "./ChipsTypes";
import { useInternalChips } from "./hooks/UseInternalChip";

type InternalChipChoiceProps = Pick<
  ChipSingleSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "name" | "hideSuffix"
>;

export function InternalChipSingleSelect({
  children,
  selected,
  name = useId(),
  hideSuffix = false,
  onChange,
  onClick,
}: InternalChipChoiceProps) {
  const { getSuffixProps } = useInternalChips();

  return (
    <div className={styles.wrapper} data-testid="singleselect-chips">
      {React.Children.map(children, child => {
        const isSelected = child.props.value === selected;
        const suffixProps = getSuffixProps(isSelected, hideSuffix);

        return (
          <label>
            <input
              type="radio"
              checked={isSelected}
              className={styles.input}
              name={name}
              onClick={handleClick(child.props.value)}
              onKeyUp={handleKeyUp(isSelected, child.props.value)}
              onChange={() => {
                /* No op. onClick handles the change to allow deselecting. */
              }}
              disabled={child.props.disabled}
            />
            <InternalChip
              {...child.props}
              {...suffixProps}
              active={isSelected}
              tabIndex={-1}
            />
          </label>
        );
      })}
    </div>
  );

  function handleKeyUp(active: boolean, value: string) {
    if (!active) return;

    return (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === " ") {
        // Wait for DOM changes before applying the new change.
        setTimeout(() => handleChange(value), 0);
      }
    };
  }

  function handleClick(value: string) {
    return (event: MouseEvent<HTMLInputElement>) => {
      onClick?.(event, value);
      handleChange(value);
    };
  }

  function handleChange(value: string) {
    const newValue = value !== selected ? value : undefined;
    onChange(newValue);
  }
}
