import React, { useMemo } from "react";
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
  const id = useMemo(() => {
    return "random-radio-id" + Math.random();
  }, [children]);

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
              name={id}
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
              role={isSelected ? "option" : undefined}
              tabIndex={-1}
              mode="form"
              disabled={child?.props.disabled}
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
      event: React.KeyboardEvent<
        HTMLInputElement | HTMLButtonElement | HTMLDivElement
      >,
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
