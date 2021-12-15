import React from "react";
import styles from "./MonthlyDayOfWeekSelect.css";
import { WeekDay } from "../../types";
// eslint-disable-next-line
import { WeeklySelect } from "../WeeklySelect/WeeklySelect";

interface MonthlyDayOfWeekSelectProps {
  disabled: boolean;
  selectedWeeks: Set<WeekDay>[];
  onChange(nextSelectedWeeks: Set<WeekDay>[]): void;
}

const getOrderString = (index: number): string => {
  switch (index) {
    case 0: {
      return "1st";
    }
    case 1: {
      return "2nd";
    }
    case 2: {
      return "3rd";
    }
    case 3: {
      return "4th";
    }
    default: {
      return "";
    }
  }
};

export function MonthlyDayOfWeekSelect({
  disabled,
  selectedWeeks,
  onChange,
}: MonthlyDayOfWeekSelectProps) {
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
            <div className={styles.order}>{`${getOrderString(index)}`}</div>
            <div className={styles.selector}>
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
