import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { CalendarPickerDayOfTheMonth } from "./CalendarPickerDayOfTheMonth";
import { CalendarPickerDayOfTheWeek } from "./CalendarPickerDayOfTheWeek";
import { useMonthlyByDay, useMonthlyByWeek } from "./useHumanReadableRRule";
import { InputNumber } from "../InputNumber";
import { RadioGroup, RadioOption } from "../RadioGroup";

export const CalendarPickerMonthly = ({
  daysOfWeek,
  onUpdate,
  defaultInterval = 1,
  defaultTypeOfMonth = 1,
  defaultMonthlyDays = [],
  enableUpdate = true,
  defaultWeeklyDays = [[]],
}: {
  readonly daysOfWeek: Array<string>;
  readonly onUpdate?: (calTime: PickedCalendarRange) => void | undefined;
  readonly defaultInterval?: number;
  readonly defaultTypeOfMonth?: number;
  readonly enableUpdate?: boolean;
  readonly defaultMonthlyDays?: Array<number | undefined>;
  readonly defaultWeeklyDays?: Array<Array<string | undefined>>;
}) => {
  const [monthlyDays, setMonthlyDays] =
    useState<Array<number | undefined>>(defaultMonthlyDays);

  const [weeklyDays, setWeeklyDays] =
    useState<Array<Array<string | undefined>>>(defaultWeeklyDays);
  const [monthlyInterval, setMonthlyInterval] = useState(defaultInterval);
  const [typeOfMonth, setTypeOfMonth] = useState(defaultTypeOfMonth);
  const monthlyByDay = useMonthlyByDay(monthlyDays, monthlyInterval);
  const monthlyByWeek = useMonthlyByWeek(weeklyDays, monthlyInterval);
  useEffect(() => {
    if (!enableUpdate) {
      setMonthlyDays(defaultMonthlyDays);
      setWeeklyDays(defaultWeeklyDays);
      setMonthlyInterval(defaultInterval);
      setTypeOfMonth(defaultTypeOfMonth);
    }
  }, [
    defaultMonthlyDays,
    defaultWeeklyDays,
    defaultInterval,
    defaultTypeOfMonth,
  ]);
  useEffect(() => {
    if (enableUpdate && onUpdate) {
      onUpdate({
        frequency: "Monthly",
        interval: monthlyInterval,
        daysOfMonth: monthlyDays,
        weeksOfMonth: weeklyDays,
        typeOfMonth,
      });
    }
  }, [monthlyInterval, monthlyDays, weeklyDays, typeOfMonth]);

  const toggleWeeklyDay = (key: number, index: number, day: string) => {
    setWeeklyDays(db => {
      const newWeeklyDays = [...db];

      if (!newWeeklyDays[key]) {
        newWeeklyDays[key] = [];
      }

      newWeeklyDays[key][index] = newWeeklyDays[key][index] ? undefined : day;

      return newWeeklyDays;
    });
  };

  const toggleMonthlyDay = (index: number) => {
    setMonthlyDays(db => {
      const n = [...db];
      n[index] = n[index] ? undefined : index + 1;

      return n;
    });
  };

  return (
    <div>
      <div className={styles.picker}>
        <div className={styles.intervalWrapper}>
          <span className={styles.intervalPrefix}>Every </span>
          <InputNumber
            value={monthlyInterval}
            onChange={d => setMonthlyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            month{monthlyInterval > 1 ? "s" : ""}:
          </span>
        </div>
      </div>
      <div className={styles.radioButtons}>
        <RadioGroup
          ariaLabel="Type Of Month"
          onChange={d => setTypeOfMonth(Number(d))}
          value={typeOfMonth}
        >
          <RadioOption value={1} label="Day of month" />
          <RadioOption value={2} label="Day of week" />
        </RadioGroup>
      </div>
      {typeOfMonth === 1 && (
        <CalendarPickerDayOfTheMonth
          value={monthlyDays}
          onClick={(index: number) => {
            toggleMonthlyDay(index);
          }}
        />
      )}
      {typeOfMonth === 2 && (
        <CalendarPickerDayOfTheWeek
          daysOfWeek={daysOfWeek}
          value={weeklyDays}
          onClick={(key: number, index: number, day: string) => {
            toggleWeeklyDay(key, index, day);
          }}
        />
      )}
      <div className={styles.summary}>
        {typeOfMonth === 1 ? monthlyByDay : monthlyByWeek}
      </div>
    </div>
  );
};
