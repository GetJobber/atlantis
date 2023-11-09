import React from "react";
import styles from "./CalendarPicker.css";
import { CalendarPickerDaysOfTheWeek } from "./CalendarPickerDaysOfTheWeek";
import { Text } from "../Text";

interface CalendarPickerDayOfTheWeekProps {
  readonly daysOfWeek: Array<string>;
  readonly value: Array<Array<string | undefined>>;
  readonly onClick: (key: number, index: number, day: string) => void;
}

export const CalendarPickerDayOfTheWeek = ({
  daysOfWeek,
  onClick,
  value,
}: CalendarPickerDayOfTheWeekProps) => {
  const weeks = ["1st", "2nd", "3rd", "4th"];

  return (
    <div>
      {weeks.map((week, key) => {
        return (
          <div key={key} className={styles.weekWrapper}>
            <Text>{week}</Text>
            <div className={styles.buttonWrapper}>
              <CalendarPickerDaysOfTheWeek
                daysOfWeek={daysOfWeek}
                onClick={(day: string, index: number) =>
                  onClick(key, index, day)
                }
                selected={index => !!value[key]?.[index]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
