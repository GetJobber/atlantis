import React, { KeyboardEvent, MouseEvent } from "react";
import { v1 as uuidv1 } from "uuid";
import styles from "./InternalChip.css";
import { ChipSingleSelectProps } from "./ChipsTypes";
import { Chip } from "../Chip";

type InternalChipChoiceProps = Pick<
  ChipSingleSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "name"
>;

export function InternalChipSingleSelect({
  children,
  selected,
  name = uuidv1(),
  onChange,
  onClick,
}: InternalChipChoiceProps) {
  return (
    <div className={styles.wrapper} data-testid="singleselect-chips">
      {React.Children.map(children, child => {
        const isSelected = child.props.value === selected;
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
            <Chip {...child.props} active={isSelected} />
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
