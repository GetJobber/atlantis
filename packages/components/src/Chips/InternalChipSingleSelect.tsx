import React, { MouseEvent } from "react";
import uuid from "uuid";
import styles from "./InternalChip.css";
import { InternalChip } from "./InternalChip";
import { ChipSingleSelectProps } from "./ChipsTypes";

type InternalChipChoiceProps = Pick<
  ChipSingleSelectProps,
  "selected" | "onChange" | "children" | "onClickChip" | "name"
>;

export function InternalChipSingleSelect({
  children,
  selected,
  name = uuid.v1(),
  onChange,
  onClickChip,
}: InternalChipChoiceProps) {
  return (
    <div className={styles.wrapper} data-testid="singleselect-chips">
      {React.Children.map(children, child => (
        <label data-testid={child.props.label}>
          <input
            type="radio"
            checked={child.props.value === selected}
            className={styles.input}
            name={name}
            onClick={handleClick(child.props.value)}
            onChange={() => {
              /* No op. onClick handles the change to allow deselecting. */
            }}
            disabled={child.props.disabled}
          />
          <InternalChip
            {...child.props}
            active={child.props.value === selected}
          />
        </label>
      ))}
    </div>
  );

  function handleClick(value: string) {
    return (event: MouseEvent<HTMLInputElement>) => {
      onClickChip?.(event, value);
      const newValue = value !== selected ? value : "";
      onChange(newValue);
    };
  }
}
