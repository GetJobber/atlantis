import React, { useState } from "react";
// import classnames from "classnames";
// import styles from "./ChipGroup.css";
import { Chip, ChipProps } from "../Chip";

interface ChipGroupProps {
  chips: ChipType[];
  value?: string[];
  disabled?: boolean;
  maxSelections?: number;
  onChange?(newValue: string[]): void;
}

type ChipType = Exclude<ChipProps, "selected" | "onClick" | "dismissActions">;

export function ChipGroup({
  chips,
  value,
  disabled: globallyDisabled,
  maxSelections,
  onChange,
}: ChipGroupProps) {
  const [val, setVal] = useState<string[]>([]);
  return (
    <span style={{ display: "flex", gap: "var(--space-base)" }}>
      {chips.map(chip => {
        const { label, disabled } = chip;
        const selected = value ? value.includes(label) : val.includes(label);
        const atSelectionLimit = maxSelections
          ? val.length >= maxSelections
          : false;

        function handleAdd() {
          const newValue = value ? [...value, label] : [...val, label];
          setVal(newValue);
          onChange && onChange(newValue);
        }

        function handleRemove() {
          const newValue = value
            ? [...value].filter(curr => curr != label)
            : [...val].filter(curr => curr != label);
          setVal(newValue);
          console.log(newValue);
          onChange && onChange(newValue);
        }

        return (
          <Chip
            key={label}
            {...chip}
            disabled={
              globallyDisabled || disabled || (!selected && atSelectionLimit)
            }
            selected={selected}
            onClick={handleAdd}
            {...(selected && {
              dismissAction: {
                ariaLabel: "Remove",
                onRequestDismiss: handleRemove,
              },
            })}
          />
        );
      })}
    </span>
  );
}
