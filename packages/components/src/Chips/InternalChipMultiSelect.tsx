import React from "react";
import styles from "./InternalChip.css";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { ChipSelectable } from "../Chip";

type InternalChipChoiceMultipleProps = Pick<
  ChipMultiSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "type"
>;

export function InternalChipMultiSelect({
  children,
  selected,
  onChange,
  onClick,
}: InternalChipChoiceMultipleProps) {
  const toggleSelectedChip = (
    val: string | number | undefined,
    ev: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const newChips = [...(selected || [])];
    const indexOfItem = newChips.findIndex(d => d === (val as string));

    if (indexOfItem !== -1) {
      newChips.splice(indexOfItem, 1);
    } else {
      newChips.push(val as string);
    }

    onChange(newChips);
    onClick && onClick(ev, val as string);
  };

  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {React.Children.map(children, chip => {
        const isChipActive = selected?.includes(
          (chip?.props.value as string) || (chip?.props.label as string),
        );

        return (
          <>
            <label style={{ display: "none" }}>
              <input
                type="checkbox"
                checked={isChipActive}
                className={styles.input}
                onClick={chip && handleClick(chip.props.value)}
                onChange={chip && handleChange(chip.props.value)}
                disabled={chip?.props.disabled}
              />
            </label>
            {chip && (
              <ChipSelectable
                {...chip.props}
                selected={isChipActive}
                onClick={toggleSelectedChip}
              ></ChipSelectable>
            )}
          </>
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
