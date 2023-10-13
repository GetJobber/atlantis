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
}: InternalChipChoiceMultipleProps) {
  const toggleSelectedChip = (val?: string | number) => {
    const newChips = [...selected];
    const indexOfItem = newChips.findIndex(d => d === (val as string));

    if (indexOfItem !== -1) {
      newChips.splice(indexOfItem, 1);
    } else {
      newChips.push(val as string);
    }

    onChange(newChips);
  };

  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {React.Children.map(children, chip => {
        const isChipActive = selected.includes(
          (chip.props.value as string) || (chip.props.label as string),
        );

        return (
          <ChipSelectable
            {...chip.props}
            selected={isChipActive}
            onClick={toggleSelectedChip}
          ></ChipSelectable>
        );
      })}
    </div>
  );
}
