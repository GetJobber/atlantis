import React, { SyntheticEvent } from "react";
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
    <div className={styles.wrapper}>
      {React.Children.map(children, child => (
        <label>
          <input
            type="radio"
            checked={child.props.value === selected}
            className={styles.input}
            name={name}
            onClick={handleClick(child.props.value)}
            onChange={() => {}} // No op. onClick handles the change to allow deselecting.
            disabled={child.props.disabled}
            data-testid="chip-input"
          />

          <InternalChip
            {...child.props}
            active={child.props.value === selected}
            warnOnLongLabels={true}
          />
        </label>
      ))}
    </div>
  );

  function handleClick(value?: string | number) {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      onClickChip?.(event, value);
      const newValue = value !== selected ? value : undefined;
      onChange(newValue);
    };
  }
}
