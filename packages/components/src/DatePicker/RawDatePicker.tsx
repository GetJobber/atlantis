import React, { useMemo, useState } from "react";
import classnames from "classnames";
import styles from "./RawDatePicker.css";
import { Icon } from "../Icon";

interface RawerDatePickerProps {
  readonly selectedDate: Date;
  readonly setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  readonly setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RawerDatePicker = ({
  selectedDate,
  setSelectedDate,
  setShowDatePicker,
}: RawerDatePickerProps) => {
  const [internalDate, setInternalDate] = useState(selectedDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const nextMonth = () => {
    let pMonth = internalDate.getMonth() + 1;
    let pYear = internalDate.getFullYear();

    if (pMonth === 13) {
      pMonth = 0;
      pYear += 1;
    }
    setInternalDate(new Date(pYear, pMonth, internalDate.getDate()));
  };

  const prevMonth = () => {
    let pMonth = internalDate.getMonth() - 1;
    let pYear = internalDate.getFullYear();

    if (pMonth === 0) {
      pMonth = 12;
      pYear -= 1;
    }
    setInternalDate(new Date(pYear, pMonth, internalDate.getDate()));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);

    // Find the previous Sunday
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());

    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Find the next Saturday
    lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    // Generate all the days from the first Sunday to the last Saturday
    const day = new Date(firstDay);
    const days = [];

    while (day <= lastDay) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    return [...days];
  };
  const daysInMonth = useMemo(
    () => getDaysInMonth(internalDate),
    [internalDate],
  );

  return (
    <div className={styles.datePicker}>
      <div className={styles.headerWrapper}>
        <div>
          <button onClick={prevMonth} type="button">
            <Icon name="arrowLeft" color="green" />
          </button>
        </div>
        <div className={styles.headerTitle}>
          {monthNames[internalDate.getMonth()]}
        </div>
        <button onClick={nextMonth} type="button">
          <Icon name="arrowRight" color="green" />
        </button>
      </div>
      <div className={styles.buttonWrapper}>
        {daysInMonth.map((fullDate, index) => {
          const day = fullDate.getDate();
          const notThisMonth = fullDate.getMonth() !== internalDate.getMonth();
          const buttonClassees = classnames({
            [styles.selected]:
              selectedDate.getDate() === fullDate.getDate() &&
              selectedDate.getMonth() === fullDate.getMonth() &&
              selectedDate.getFullYear() === fullDate.getFullYear(),
            [styles.outOfMonth]: notThisMonth,
          });

          return (
            <button
              type="button"
              key={index}
              className={buttonClassees}
              disabled={notThisMonth}
              onClick={e => {
                e.preventDefault();
                const newDate = new Date(
                  internalDate.getFullYear(),
                  internalDate.getMonth(),
                  day,
                );
                setSelectedDate(newDate);
                setShowDatePicker(false);
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
