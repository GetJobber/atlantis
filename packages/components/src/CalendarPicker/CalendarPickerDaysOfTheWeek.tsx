import React from "react";
import styles from "./CalendarPicker.css";

interface DaysOfTheWeekProps {
  readonly daysOfWeek: Array<string>;
  readonly selected?: (index: number) => boolean;
  readonly onClick: (day: string, index: number) => void;
}

export const CalendarPickerDaysOfTheWeek = ({
  daysOfWeek,
  selected = () => false,
  onClick,
}: DaysOfTheWeekProps) => {
  return (
    <>
      {daysOfWeek.map((day, index) => {
        return (
          <button
            type="button"
            className={`${selected(index) ? styles.selected : ""} ${
              styles.button
            }`}
            key={index}
            onClick={() => onClick(day, index)}
          >
            {day}
          </button>
        );
      })}
    </>
  );
};
