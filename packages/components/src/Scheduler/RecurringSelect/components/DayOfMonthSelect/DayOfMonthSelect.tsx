import React from "react";
import styles from "./DayOfMonthSelect.css";
import { DayOfMonth } from "../../../types";

interface DayOfMonthSelectProps {
  selectedDays: Set<DayOfMonth>;
  disabled: boolean;
  onChange(selectedDays: Set<DayOfMonth>): void;
}

const daysInMonth = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  "LAST",
];

export function DayOfMonthSelect({
  selectedDays,
  disabled,
  onChange,
}: DayOfMonthSelectProps) {
  const onChangeDayOfMonth = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const day =
      event.currentTarget.value === "LAST"
        ? event.currentTarget.value
        : (+event.currentTarget.value as DayOfMonth);
    const next = new Set(selectedDays);

    if (selectedDays.has(day)) {
      next.delete(day);
    } else {
      next.add(day);
    }
    onChange(next);
  };

  return (
    <div className={styles.container}>
      {daysInMonth.map(day => {
        const isSelected = selectedDays.has(day as DayOfMonth);
        return (
          <div key={`${day}`} className={styles.checkboxWrapper}>
            <input
              disabled={disabled}
              type="checkbox"
              id={`${day}`}
              onChange={onChangeDayOfMonth}
              aria-checked={isSelected}
              checked={isSelected}
              value={day}
            />
            <label className={styles.dayCheckbox} htmlFor={`${day}`}>
              {`${day === "LAST" ? "Last day" : day}`}
            </label>
          </div>
        );
      })}
    </div>
  );
}
