import React from "react";
import styles from "./InternalChip.css";
import { ChipSingleSelectProps } from "./ChipsTypes";
import { ChipSelectable } from "../Chip";

type InternalChipChoiceProps = Pick<
  ChipSingleSelectProps,
  "selected" | "onChange" | "children" | "onClick" | "name" | "type"
>;

export function InternalChipSingleSelect({
  children,
  selected,
  onChange,
}: InternalChipChoiceProps) {
  return (
    <div className={styles.wrapper} data-testid="singleselect-chips">
      {React.Children.map(children, child => {
        const isSelected =
          child.props.value === selected || child.props.label === selected;

        return (
          <ChipSelectable
            {...child.props}
            selected={isSelected}
            onClick={clickedItem => onChange(clickedItem as string)}
          />
        );
      })}
    </div>
  );
}
