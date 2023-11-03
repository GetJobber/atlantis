import React from "react";
import styles from "./InternalChip.css";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { Chip } from "../Chip";
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
        const isChipActive = selected?.includes(
          (chip?.props.value as string) || (chip?.props.label as string),
        );

        return (
          <label>
            <input
              type="checkbox"
              checked={isChipActive}
              className={styles.input}
              onClick={chip && handleClick(chip.props.value)}
              onChange={chip && handleChange(chip.props.value)}
              disabled={chip?.props.disabled}
            />
            {chip && (
              <Chip {...chip.props} mode="form">
                <Chip.Suffix>
                  {isChipActive && (
                    <Icon name="checkmark" size="small" color="heading" />
                  )}
                </Chip.Suffix>
              </Chip>
            )}
          </label>
        );

        function isChipSelected(value: string) {
          return selected?.includes(value);
        }

        function handleClick(value: string) {
          return (event: React.MouseEvent<HTMLInputElement>) =>
            onClick?.(event, value);
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
          const newVal = [...(selected || []), value];
          onChange(newVal);
        }

        function handleDeselect(value: string) {
          const values = selected;
          const newVal = values?.filter(val => val !== value);
          onChange(newVal || []);
        }
      })}
    </div>
  );
}
