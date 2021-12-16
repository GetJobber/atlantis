import React from "react";
import styles from "./MonthlyDayOfWeekSelect.css";
import { Text } from "../../../Text";
import { WeekDay } from "../../types";
import { WeeklySelect } from "../index";

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
            <Text>{`${getOrderString(index)}`}</Text>
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
