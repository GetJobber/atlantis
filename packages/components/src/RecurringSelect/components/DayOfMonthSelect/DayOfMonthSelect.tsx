import React from "react";
import uuid from "uuid";
import styles from "./DayOfMonthSelect.css";
import checkboxStyles from "../../DateCellCheckbox.css";
import { DayOfMonth } from "../../types";

interface DayOfMonthSelectProps {
  selectedDays: Set<DayOfMonth>;
  disabled: boolean;
  onChange(selectedDays: Set<DayOfMonth>): void;
}

const daysInMonth = [...Array.from({ length: 31 }, (_, i) => i + 1), "LAST"];

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
        const inputId = uuid();

        return (
          <div key={`${day}`} className={checkboxStyles.checkboxWrapper}>
            <input
              className={checkboxStyles.dayCheckboxInput}
              disabled={disabled}
              type="checkbox"
              id={`${day}-${inputId}`}
              onChange={onChangeDayOfMonth}
              aria-checked={isSelected}
              checked={isSelected}
              value={day}
            />
            <label
              className={checkboxStyles.dayCheckbox}
              htmlFor={`${day}-${inputId}`}
            >
              {`${day === "LAST" ? "Last day" : day}`}
            </label>
          </div>
        );
      })}
    </div>
  );
}
