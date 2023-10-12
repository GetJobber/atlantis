import React from "react";
import styles from "./MonthlyDayOfWeekSelect.css";
import { WeeklySelect } from "./WeeklySelect";
import { Text } from "../../Text";
import { WeekDay } from "../types";

interface MonthlyDayOfWeekSelectProps {
  readonly disabled: boolean;
  readonly selectedWeeks: Set<WeekDay>[];
  onChange(nextSelectedWeeks: Set<WeekDay>[]): void;
}

export function MonthlyDayOfWeekSelect({
  disabled,
  selectedWeeks,
  onChange,
}: MonthlyDayOfWeekSelectProps) {
  const orderString = ["1st", "2nd", "3rd", "4th"];

  return (
    <div className={styles.parentContainer}>
      {selectedWeeks.map((week, index) => {
        const onChangeWeek = (weekDay: Set<WeekDay>) => {
          const next: typeof selectedWeeks = [...selectedWeeks];

          next.splice(index, 1, weekDay);

          onChange(next);
        };

        return (
          <div className={styles.container} key={`${index}${week}`}>
            <Text>{`${orderString[index]}`}</Text>
            <div>
              <WeeklySelect
                disabled={disabled}
                selectedDays={week}
                onChange={onChangeWeek}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
