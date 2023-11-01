import React from "react";
import styles from "./InternalChip.css";
import { ChipSingleSelectProps } from "./ChipsTypes";
import { Chip } from "../Chip";
import { Icon } from "../Icon";

type InternalChipChoiceProps = Pick<
  ChipSingleSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "name"
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
          child?.props.value === selected || child?.props.label === selected;

        return (
          <label>
            <input
              type="radio"
              checked={isSelected}
              tabIndex={-1}
              className={styles.input}
              onClick={handleClick(child?.props.value || "")}
              onKeyUp={handleKeyUp(isSelected, child?.props.value || "")}
              onChange={() => {
                /* No op. onClick handles the change to allow deselecting. */
              }}
              disabled={child?.props.disabled}
            />
            <Chip
              label={child?.props.label || ""}
              role="option"
              actAsFormElement={true}
            >
              <Chip.Suffix>
                {isSelected && (
                  <Icon name="checkmark" size="small" color="heading" />
                )}
              </Chip.Suffix>
            </Chip>
          </label>
        );
      })}
    </div>
  );

  function handleKeyUp(active: boolean, value: string) {
    if (!active) return;

    return (
      event: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    ) => {
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
