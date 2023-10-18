import React from "react";
import styles from "./InternalChip.css";
import { ChipSingleSelectProps } from "./ChipsTypes";
import { InternalChip } from "./InternalChip";
import { ChipSelectable } from "../Chip";

type InternalChipChoiceProps = Pick<
  ChipSingleSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "name" | "type"
>;

export function InternalChipSingleSelect({
  children,
  selected,
  onChange,
  onClick,
}: InternalChipChoiceProps) {
  return (
    <div className={styles.wrapper} data-testid="singleselect-chips">
      {React.Children.map(children, child => {
        const isSelected =
          child.props.value === selected || child.props.label === selected;

        return (
          <>
            <label style={{ display: "none" }}>
              <input
                type="radio"
                checked={isSelected}
                className={styles.input}
                onClick={handleClick(child.props.value)}
                onKeyUp={handleKeyUp(isSelected, child.props.value)}
                onChange={() => {
                  /* No op. onClick handles the change to allow deselecting. */
                }}
                disabled={child.props.disabled}
              />
              <InternalChip {...child.props} active={isSelected} />
            </label>
            <ChipSelectable
              {...child.props}
              selected={isSelected}
              onClick={clickedItem => {
                onChange(clickedItem as string);
                onClick && onClick({}, child?.props.value);
              }}
              onKeyDown={handleKeyUp(isSelected, child?.props.value)}
            />
          </>
        );
      })}
    </div>
  );

  function handleKeyUp(active: boolean, value: string) {
    console.log("AHANDLING HKEYU UP", active, value);
    if (!active) return;

    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === " ") {
        // Wait for DOM changes before applying the new change.
        setTimeout(() => handleChange(value), 0);
      }
    };
  }

  function handleClick(value: string) {
    return (event: React.MouseEvent<HTMLInputElement>) => {
      onClick?.(event, value);
      handleChange(value);
    };
  }

  function handleChange(value: string) {
    const newValue = value !== selected ? value : undefined;
    onChange(newValue);
  }
}
