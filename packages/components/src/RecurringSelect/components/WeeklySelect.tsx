import React from "react";
import { v1 as uuidv1 } from "uuid";
import styles from "./WeeklySelect.css";
import checkboxStyles from "../DateCellCheckbox.css";
import { WeekDay } from "../types";

interface WeeklySelectProps {
  readonly disabled: boolean;
  readonly selectedDays: Set<WeekDay>;
  onChange(selectedDays: Set<WeekDay>): void;
}
const weekDays = [0, 1, 2, 3, 4, 5, 6];

export function WeeklySelect({
  onChange,
  selectedDays,
  disabled,
}: WeeklySelectProps) {
  const onChangeWeekDays = (event: React.FormEvent<HTMLInputElement>): void => {
    const day = Number(event.currentTarget.value);
    const next = new Set(Array.from(selectedDays));

    if (selectedDays.has(day)) {
      next.delete(day);
    } else {
      next.add(day);
    }
    onChange(next);
  };

  return (
    <div className={styles.container}>
      {weekDays.map(weekDay => {
        const isSelected = selectedDays.has(weekDay);
        const inputId = uuidv1();

        return (
          <div key={`${weekDay}`} className={checkboxStyles.checkboxWrapper}>
            <input
              className={checkboxStyles.dayCheckboxInput}
              disabled={disabled}
              type="checkbox"
              onChange={onChangeWeekDays}
              id={`weekly-select-${weekDay}${inputId}`}
              aria-checked={isSelected}
              checked={isSelected}
              value={weekDay}
            />
            <label
              className={checkboxStyles.dayCheckbox}
              htmlFor={`weekly-select-${weekDay}${inputId}`}
            >
              {`${WeekDay[weekDay].substr(0, 1).toUpperCase()}`}
            </label>
          </div>
        );
      })}
    </div>
  );
}
