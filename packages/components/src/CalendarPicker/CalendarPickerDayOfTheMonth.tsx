import React, { useMemo } from "react";
import styles from "./CalendarPicker.css";

interface CalendarPickerDayOfTheMonthProps {
  readonly value: Array<number | undefined>;
  readonly onClick: (b: number) => void;
  readonly dayLength?: number;
  readonly includeLastDay?: boolean;
  readonly lastDayLabel?: string;
  readonly className?: string;
}

export const CalendarPickerDayOfTheMonth = ({
  dayLength = 31,
  includeLastDay = true,
  className = "",
  lastDayLabel = "Last Day",
  value,
  onClick,
}: CalendarPickerDayOfTheMonthProps) => {
  const days = useMemo(() => Array.from({ length: dayLength }), [dayLength]);

  return (
    <div className={`${styles.buttonWrapper} ${className}`}>
      {days.map((_, index) => {
        return (
          <button
            type="button"
            className={`${value[index] ? styles.selected : ""} ${
              styles.button
            }`}
            onClick={() => onClick(index)}
            key={index}
          >
            {index + 1}
          </button>
        );
      })}
      {includeLastDay && (
        <button
          type="button"
          className={`${value[dayLength] ? styles.selected : ""} ${
            styles.button
          } ${styles.bigButton}`}
          onClick={() => onClick(dayLength)}
        >
          {lastDayLabel}
        </button>
      )}
    </div>
  );
};
